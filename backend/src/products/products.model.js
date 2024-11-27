import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: String,
    description: String,
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    image: String,
    rating: {
      type: Number,
      default: 0,
    },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);

export default Products;
