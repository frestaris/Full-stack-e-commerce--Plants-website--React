import express from "express";
import mongoose from "mongoose";
import Products from "./products.model.js";
import Reviews from "../reviews/reviews.model.js";
import { verifyToken } from "../middleware/verifyToken.js";

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

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Construct the filter object
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Number.MAX_VALUE;
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    // Pagination setup
    const pageNum = Math.max(1, parseInt(page));
    const itemsPerPage = Math.max(1, parseInt(limit));
    const skip = (pageNum - 1) * itemsPerPage;

    // Query the database
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const products = await Products.find(filter)
      .skip(skip)
      .limit(itemsPerPage)
      .populate("author", "email")
      .sort({ createdAt: -1 });

    // Send response
    res.status(200).json({ products, totalPages, totalProducts });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid product ID",
        message: "Please provide a valid MongoDB ObjectId.",
      });
    }

    // Fetch the product by ID
    const product = await Products.findById(id).populate(
      "author",
      "email username"
    );

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
        message: `No product found with ID: ${id}`,
      });
    }

    // Fetch reviews for the product
    const reviews = await Reviews.find({ productId: id }).populate(
      "userId",
      "username email"
    );

    res.status(200).json({ product, reviews });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// UPDATE A PRODUCT
router.patch("/update-product/:id", verifyToken, async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        error: "Invalid product ID",
        message: "Please provide a valid MongoDB ObjectId.",
      });
    }

    // Update the product
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` ensures validation
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error: "Product not found.",
        message: `No product found with ID: ${productId}`,
      });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// DELETE A PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        error: "Invalid product ID",
        message: "Please provide a valid MongoDB ObjectId.",
      });
    }

    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        error: "Product not found.",
        message: `No product found with ID: ${productId}`,
      });
    }

    await Reviews.deleteMany({ productId: productId });

    res.status(200).json({
      message: "Product deleted successfully.",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

// GET RELATED PRODUCTS
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid product ID",
        message: "Please provide a valid MongoDB ObjectId.",
      });
    }

    // Find the product by ID
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found.",
        message: `No product found with ID: ${id}`,
      });
    }

    // Build a more specific regex for the product name
    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );

    // Find related products (same category, excluding the current product)
    const relatedProducts = await Products.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    })
      .limit(5)
      .sort({ createdAt: -1 })
      .populate("author", "email");

    res.status(200).json({ relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error.message);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

export default router;
