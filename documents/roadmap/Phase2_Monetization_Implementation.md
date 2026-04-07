# Phase 2 & 2.5: Monetization & Tier Enforcement Architecture

**Target**: Fleshing out the implementation steps for routing the user through a Stripe subscription flow, updating their database entitlements asynchronously, and strictly gating Premium routes using Next.js Edge Middleware.

## 1. Schema Modifications (Phase 2 Prep)

Before we start the Node backend, the Supabase schema requires an adjustment. Currently, Phase 1B enforces image quotas by looking at the `user_features.tier` string (`free` vs `pro`). To accurately map webhooks back to the user, we must introduce Stripe telemetry into this table.

### Execute via Migration:
Create a new migration (`npx supabase migration new add_stripe_telemetry`) with:
```sql
ALTER TABLE public.user_features 
ADD COLUMN stripe_customer_id TEXT UNIQUE,
ADD COLUMN stripe_subscription_id TEXT UNIQUE,
ADD COLUMN stripe_price_id TEXT;

-- Create an index to massively speed up webhook lookups
CREATE INDEX idx_stripe_customer ON public.user_features(stripe_customer_id);
```

---

## 2. Server Action Checkout Initialization

**Principle:** *Never expose auth tokens to the client unnecessarily.* 
We will generate Stripe Checkout sessions securely on the server using Next.js Server Actions.

**Implementation File:** `src/app/upgrade/actions.ts`
1. Extract the `user.id` from `createClient().auth.getUser()`.
2. Check `user_features` to see if the user already has a `stripe_customer_id`. (If not, Stripe will create one during checkout).
3. Initialize the Stripe library using the secret `STRIPE_SECRET_KEY` from `.env.local`.
4. Create a `stripe.checkout.sessions.create` passing `client_reference_id = user.id`. This ensures the anonymous webhook can successfully map back to our internal user ID!
5. Return the exact `stripe_session.url` to the client for a hard `redirect()`.

---

## 3. Stripe Webhook Ingestion

**Implementation File:** `src/app/api/webhooks/stripe/route.ts`

This route handles asynchronous `POST` requests from Stripe whenever a user successfully clicks "Pay".

### Security Posture:
1. Validate the cryptographic signature (`req.headers.get('stripe-signature')`) against `STRIPE_WEBHOOK_SECRET` to ensure the payload is genuinely from Stripe.
2. **Supabase Bypass:** Because Webhooks run anonymously (without a browser cookie), we MUST initialize our database client utilizing the `SUPABASE_SERVICE_ROLE_KEY` to successfully bypass RLS. 

### Processing Logic:
* **Event:** `checkout.session.completed`
  * Extract `client_reference_id` (this is our internal user `id`).
  * Extract the `customer` ID and `subscription` ID.
  * Execute: 
    ```js
    await supabaseAdmin
      .from('user_features')
      .update({ 
        tier: 'pro',
        stripe_customer_id: customer,
        stripe_subscription_id: subscription
      })
      .eq('id', client_reference_id);
    ```

---

## 4. Edge Middleware Enforcement (Phase 2.5)

**Principle:** *Handle tokens in middleware for protected routes.* 
We must universally gate PRO routes (like `/comp-card/export` or `/dashboard/premium`) before the page even begins to render on the server.

**Implementation File:** `src/middleware.ts`

### Execution Loop:
1. Intercept the request URL. If the user is trying to access a restricted path (e.g., `req.nextUrl.pathname.includes('/comp-card/print')`), trigger the auth logic.
2. Spin up `@supabase/ssr` to read the session cookies.
3. If no session exists, instantly redirect to `/login`.
4. If a session exists, query the DB for the user's `tier`.
   > *Note:* Because middleware runs on the Vercel Edge, standard PostgREST DB queries via the Supabase client work flawlessly.
5. If `user_features.tier === 'free'`, execute a hard `NextResponse.redirect(new URL('/upgrade', request.url))`.
6. If `pro`, pass the request down the chain natively using `NextResponse.next()`. 

This permanently segregates paying users from free users at the absolute lowest routing layer of the application structure without leaking state into the browser.
