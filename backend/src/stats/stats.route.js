import express from "express";
import User from "../users/user.model.js";
import Order from "../orders/orders.model.js";
import Products from "../products/products.model.js";
import Reviews from "../reviews/reviews.model.js";

const router = express.Router();

// User stats by email
router.get("/user-stats/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ message: "User not found" });

    const totalPaymentsResult = await Order.aggregate([
      { $match: { email: email } },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]);
    const totalPaymentsAmount =
      totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;

    const totalReviews = await Reviews.countDocuments({ userId: user._id });

    const purchasedProductsIds = await Order.distinct("products.productId", {
      email: email,
    });
    const totalPurchasedProducts = purchasedProductsIds.length;

    return res.status(200).send({
      totalPayments: totalPaymentsAmount.toFixed(2),
      totalReviews,
      totalPurchasedProducts,
    });
  } catch (error) {
    console.error("Error fetching user stats", error);
    res.status(500).send({
      message: "Failed to fetch user stats",
    });
  }
});

// Admin status
router.get("/admin-stats", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Products.countDocuments();
    const totalReviews = await Reviews.countDocuments();
    const totalUsers = await User.countDocuments();

    // calculate total earning
    const totalEarningsResult = await Order.aggregate([
      { $group: { _id: null, totalEarnings: { $sum: "$amount" } } },
    ]);

    const totalEarnings =
      totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

    const monthlyEarningsResult = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          monthlyEarnings: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthlyEarnings = Array.from({ length: 12 }, (_, index) => {
      const monthData = monthlyEarningsResult.find(
        (entry) => entry._id.month === index + 1
      );
      return {
        month: index + 1,
        year: monthData?._id.year || new Date().getFullYear(),
        earnings: monthData ? monthData.monthlyEarnings : 0,
      };
    });

    return res.status(200).json({
      totalOrders,
      totalProducts,
      totalReviews,
      totalUsers,
      totalEarnings,
      monthlyEarnings,
    });
  } catch (error) {
    console.error("Error fetching admin stats", error);
    res.status(500).send({
      message: "Failed to fetch admin stats",
    });
  }
});

export default router;
