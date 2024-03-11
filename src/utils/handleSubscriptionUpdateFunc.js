import { loadStripe } from "@stripe/stripe-js";
// Assuming you have set your publishable key
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_TEST_KEY}`);

const handleSubscriptionUpdateFunc = async (plan) => {
  // Get Stripe.js instance
  const stripe = await stripePromise;

  // Call your backend to create the PaymentIntent
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/payment/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      }
    );

    const { priceId } = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await stripe.redirectToCheckout({
      mode: "subscription",
      lineItems: [{ price: priceId, quantity: 1 }],
      successUrl: "http://localhost:4000/success",
      cancelUrl: "http://localhost:4000/cancel",
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error during payment:", error.message);
    alert("Payment failed. Please try again later.");
  }
};

export default handleSubscriptionUpdateFunc;
