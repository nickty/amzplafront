import { loadStripe } from "@stripe/stripe-js";

// Assuming you have set your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const handleSubscriptionUpdateFunc = async (plan) => {
  const stripe = await stripePromise;

  // Example dynamic price selection based on plan
  const priceMap = {
    free: null, // Assuming no charge for the free plan
    basic: "basic", // Replace with your actual price ID for the basic plan
    premium: "premium", // Replace with your actual price ID for the premium plan
  };

  const selectedPriceId = priceMap[plan];

  if (!selectedPriceId) {
    alert("Free plan selected or invalid plan. No payment required.");
    return;
  }

  try {
    // Assume your backend correctly handles receiving the plan and returns the corresponding Stripe price ID
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

    console.log("check check", response);

    const { sessionId } = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error("Error during payment:", error.message);
      alert("Payment failed. Please try again later.");
    }
  } catch (error) {
    console.error("Error during payment:", error.message);
    alert("Payment failed. Please try again later.");
  }
};

export default handleSubscriptionUpdateFunc;
