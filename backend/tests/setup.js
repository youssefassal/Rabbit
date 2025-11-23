const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  // Connect to a test database if needed, or mock mongoose
  // For this example, we might want to use a separate test DB URI
});

afterAll(async () => {
  await mongoose.connection.close();
});
