# Magic Link Authentication in Next.js App Router (Supabase)
**Troubleshooting & Implementation Guide (Phase 1A/1B)**

Implementing passwordless Magic Links using Supabase within a Next.js App Router architecture introduces several specialized nuances compared to a standard React/Vite Single Page Application. 

Over the course of implementing the Pose & Poise PoC, we encountered and resolved several critical "Gotchas" regarding HTTP-only cookie management, redirect routing, and Local Docker container settings.

---

## 1. The PKCE Server-Side Cookie Trap
Because Next.js uses Server Components to query the database, your `session` cannot solely exist in the user's React browser cache. The session must be embedded into an HTTP-only web cookie so your layout files can read `supabase.auth.getUser()`.

**The Gotcha:** If you let Supabase Magic Link click directly to your `dashboard`, the browser will establish the token, but the Next.js server will fail to see the cookie and aggressively throw the user back to `/login`.

**The Fix:** You must create an API interception route (`src/app/auth/confirm/route.ts`). You force the Magic Link email template to point directly to this headless backend endpoint explicitly passing `token_hash` and `type=email`. This API hits `supabase.auth.verifyOtp()`, physically securely mints the cookie onto the domain, and *then* redirects the browser cleanly to the frontend URL!

## 2. The "Open-Redirect" Safety Conflict
Supabase AI highly recommends validating the `next` routing parameter inside `route.ts` to prevent malicious open-redirect attacks.

**The Gotcha:** The boilerplate code checks: `rawNext.startsWith("/")`. However, if you natively pass an absolute URL from your frontend form like `emailRedirectTo: "http://localhost:3000/onboarding"`, it will fail the `/` check! Your code will successfully mint the session, natively reject your targeted `/onboarding` location, and silently redirect the user to `/dashboard` instead.

**The Fix:** When using `emailRedirectTo` inside your client component `signInWithOtp` call, explicitly pass the API route *with* a relative query target:
`emailRedirectTo: "http://localhost:3000/auth/confirm?next=/onboarding"`

## 3. Cookie Domain Isolation & Local Setup
When testing your authentication natively using Docker and Inbucket, domain mismatches will instantly destroy your access cookies.

**The Gotcha:** If you go to `http://localhost:3000` to test your website, but your `supabase/config.toml` has `site_url = "http://127.0.0.1:3000"`, the local Supabase GoTrue server will dispatch magic links strictly back to `127.0.0.1:3000`. When the user clicks the link, the browser successfully establishes the cookie on `127.0.0.1`, but your Next.js session expects it on `localhost`!

**The Fix:** 
1. Rigorously ensure your testing browser URL and your `site_url` matching inside your TOML are completely identical (`http://localhost:3000`).
2. You must update your `config.toml` securely allowing query-parameter routing by passing wildcards into the authorization list:
   `additional_redirect_urls = ["http://localhost:3000/**/*"]`

*If that wildcard is absent, the Supabase server will classify your Next.js query parameter as unauthorized, quietly delete your redirect instruction altogether, and default you awkwardly to the raw root domain.*

## 4. Local Email Template Redirection Conflict
Supabase Local natively uses default GoTrue HTML configurations that automatically resolve tokens directly with the backend `auth/v1/verify` API instead of your custom Next.js router.

**The Gotcha:** If you manually built a beautiful custom HTML template on your Supabase Cloud Dashboard that perfectly formatted your `<a href="{{ .SiteURL }}/auth/confirm...">` link, running `npx supabase start` completely ignores the remote setting and breaks your local test link.

**The Fix:**
You must physically create a replica of that template inside your repo (e.g. `supabase/templates/magic_link.html`) and map the connection directly in your `config.toml`:
```toml
[auth.email.template.magic_link]
subject = "Confirm Your Signup | Pose & Poise"
content_path = "./supabase/templates/magic_link.html"
```
Without this, your Inbucket magic link will fundamentally bypass your `route.ts` interceptor entirely!
