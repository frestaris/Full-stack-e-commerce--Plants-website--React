import express from "express";
import Order from "./orders.model.js";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "AUD",
        product_data: {
          name: product.name,
          images: [product.image || ""],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session", error);
    res.status(500).send({ message: "Failed to create checkout session" });
  }
});

// Confirm payment
router.post("/confirm-payment", async (req, res) => {
  const { session_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

    const paymentIntentId = session.payment_intent;
    const paymentStatus = session.payment_intent.status;
    const email = session.customer_details.email;
    const amount = session.amount_total / 100;

    // Retrieve or create the order
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));

      order = new Order({
        orderId: paymentIntentId,
        amount,
        products: lineItems,
        email,
        status: paymentStatus === "succeeded" ? "pending" : "failed",
      });
    } else {
      order.status = paymentStatus === "succeeded" ? "pending" : "failed";
    }

    await order.save();
    res.json({ order });
  } catch (error) {
    console.error("Error confirming payment", error);
    res.status(500).send({ message: "Failed to confirm payment" });
  }
});

export default router;
