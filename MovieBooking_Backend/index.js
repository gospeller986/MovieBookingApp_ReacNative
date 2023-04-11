require("dotenv").config();

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

const port = 8000;

//  middlewares
app.use(express.json());
app.use(cors());

app.post('/payment', async (req, res) => {
  try {
    const {amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "INR",
      payment_method_types:["card"],
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({
       clientSecret,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Listening on Port 8000 ");
});
