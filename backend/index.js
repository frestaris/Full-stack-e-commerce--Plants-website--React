import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/users/user.route.js";
import productRoutes from "./src/products/products.route.js";
import reviewRoutes from "./src/reviews/reviews.router.js";
import orderRoutes from "./src/orders/orders.route.js";
import statsRoutes from "./src/stats/stats.route.js";
import uploadImage from "./src/utils/uploadImage.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);

const port = process.env.PORT || 3000;

app.post("/uploadImage", (req, res) => {
  console.log("Received request to upload image");
  console.log("Image data:", req.body.image?.slice(0, 100));

  uploadImage(req.body.image)
    .then((url) => {
      console.log("Image uploaded successfully, URL:", url);
      res.send(url);
    })
    .catch((err) => {
      console.error("Error during image upload:", err);
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
