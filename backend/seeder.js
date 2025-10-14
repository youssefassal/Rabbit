const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product.js");
const User = require("./models/User.js");
const Cart = require("./models/Cart.js");

const products = require("./data/products.js");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// function to seed the data

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding product data:", error);
    process.exit(1);
  }
};

seedData();
