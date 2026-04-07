require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function run() {
  const customer = await stripe.customers.create({ email: "test@example.com" });
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_ID }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
  });
  console.log("Sub status:", subscription.status);
  console.log("Latest Invoice Payment Intent:", subscription.latest_invoice && typeof subscription.latest_invoice !== 'string' ? "Has object" : "Is string/null");
  
  const paymentIntent = typeof subscription.latest_invoice === 'object' && subscription.latest_invoice !== null ? subscription.latest_invoice.payment_intent : null;
  console.log("Payment Intent inside Latest Invoice:", paymentIntent && typeof paymentIntent !== 'string' ? paymentIntent.client_secret : paymentIntent);
  
  console.log("Pending Setup Intent:", subscription.pending_setup_intent && typeof subscription.pending_setup_intent !== 'string' ? subscription.pending_setup_intent.client_secret : subscription.pending_setup_intent);

}
run().catch(console.dir);
