const express = require("express");
const Order = require("../models/Order.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// @route  Get /api/orders/my-orders
// @desc   Get logged in user's orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
  try {
    // find orders for the logged-in user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route  Get /api/orders/:id
// @desc   Get order by ID
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the full order details
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
