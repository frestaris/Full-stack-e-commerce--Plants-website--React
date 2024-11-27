import express from "express";
import Products from "./products.model.js";
import Reviews from "../reviews/reviews.model.js";

const router = express.Router();

// POST A PRODUCT
router.post("/create-product", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.author) {
      return res.status(400).json({
        error: "Missing required fields: name, price, and author are required.",
      });
    }

    const newProduct = new Products({ ...req.body });
    const savedProduct = await newProduct.save();

    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      savedProduct.rating = averageRating;
      await savedProduct.save();
    }

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation error",
        details: error.message,
      });
    }
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

export default router;
