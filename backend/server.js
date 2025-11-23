const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const checkoutRoutes = require("./routes/checkoutRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const subscribeRoute = require("./routes/subscribeRoute.js");
const adminRoutes = require("./routes/adminRoutes.js");
const productAdminRoutes = require("./routes/productAdminRoutes.js");
const adminOrderRoutes = require("./routes/adminOrderRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Rabbit Api!");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
