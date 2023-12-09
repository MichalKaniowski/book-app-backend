const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/intents", async (req, res) => {
  // create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "pln",
    automatic_payment_methods: {
      enable: true,
    },
  });

  res.json({ paymentIntent: paymentIntent.client_secret });
});

module.exports = router;
