const express = require("express");
const Checkout = require("../models/Checkout.js");
const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// @route  POST /api/checkout
// @desc   Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }

  try {
    // Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route  PUT /api/checkout/:id/pay
// @desc   Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    // Handle different payment statuses
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
    } else if (
      paymentStatus === "pending" &&
      paymentDetails?.method === "COD"
    ) {
      // Handle Cash on Delivery
      checkout.isPaid = false; // COD orders are not paid immediately
      checkout.paymentStatus = "pending";
      checkout.paymentDetails = paymentDetails;
      checkout.paymentMethod = "Cash on Delivery";
    } else {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    await checkout.save();
    res.status(200).json({ message: "Payment status updated", checkout });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route  POST /api/checkout/:id/finalize
// @desc   Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    // Check if checkout can be finalized
    const canFinalize =
      !checkout.isFinalized &&
      (checkout.isPaid || checkout.paymentMethod === "Cash on Delivery");

    if (canFinalize) {
      // create final order based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: checkout.isPaid, // COD orders will be false, PayPal will be true
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: checkout.paymentStatus, // "paid" for PayPal, "pending" for COD
        paymentDetails: checkout.paymentDetails,
      });

      // Mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      // Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: req.user._id });

      res.status(200).json({ message: "Checkout finalized", finalOrder });
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout is already finalized" });
    } else {
      res
        .status(400)
        .json({
          message:
            "Checkout cannot be finalized - payment required or invalid payment method",
        });
    }
  } catch (error) {
    console.error("Error finalizing checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
