import express from "express";
import Order from "./orders.model.js";
import Stripe from "stripe";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const taxRate = 0.05;

  try {
    const totalPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const tax = totalPrice * taxRate;
    const amount = totalPrice + tax;

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
      success_url: `https://full-stack-e-commerce-plants-website-react.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://full-stack-e-commerce-plants-website-react.vercel.app/cancel`,
      metadata: {
        tax: tax,
        amount: amount,
      },
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
      expand: ["line_items.data.price.product", "payment_intent"],
    });
    const paymentIntentId = session.payment_intent.id;

    let order = await Order.findOne({ orderId: paymentIntentId });
    if (!order) {
      const lineItems = session.line_items.data.map((item) => {
        const product = item.price.product;
        return {
          productId: product.id,
          name: product.name,
          image: product.images?.[0],
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
        };
      });

      const tax = session.metadata.tax;
      const amount = session.metadata.amount;

      order = new Order({
        orderId: paymentIntentId,
        amount: amount,
        products: lineItems,
        email: session.customer_details.email,
        tax: tax,
        status:
          session.payment_intent.status === "succeeded" ? "pending" : "failed",
      });
    } else {
      order.status =
        session.payment_intent.status === "succeeded" ? "pending" : "failed";
    }
    await order.save();
    res.json({ order });
  } catch (error) {
    console.error("Error confirming payment", error);
    res.status(500).send({ message: "Failed to confirm payment" });
  }
});

// Get orders by Id
router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId: orderId });
    if (!order) {
      return res.status(404).send({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by user ID:", error);

    res.status(500).send({
      message: "Failed to fecth order by user ID",
    });
  }
});

// Get order by email address
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({
      message: "Email is required",
    });
  }
  try {
    const orders = await Order.find({ email: email });

    if (orders.length === 0) {
      return res
        .status(400)
        .send({ orders: 0, message: "No orders found for this email" });
    }
    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders by email", error);
    res.status(500).send({ message: "Failed to fecth orders by email" });
  }
});

// Get all orders
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(404).send({ message: "No orders found", orders: [] });
    }
    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      message: "Failed to fetch all orders",
    });
  }
});

// Update order status
router.patch(
  "/update-order-status/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).send({ message: "Status is requuired" });
    }
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          status,
          updatedAt: new Date(),
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedOrder) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order status:", error);

      res.status(500).send({
        message: "Failed to update order status",
      });
    }
  }
);

// Delete order
router.delete("/delete-order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).send({
        message: "Order not found",
      });
    }
    res.status(200).json({
      message: "Order deleted successfully.",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send({
      message: "Failed to delete order",
    });
  }
});

export default router;
