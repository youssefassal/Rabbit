# Rabbit - E-Commerce Platform

Rabbit is a comprehensive full-stack e-commerce platform built with modern web technologies. It features a robust frontend for users to browse products, manage their cart, and complete purchases, along with a powerful admin dashboard for inventory and order management.

---

## 🚀 Tech Stack

### Frontend

- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit & React-Redux
- **Styling:** Tailwind CSS v4
- **Routing:** React Router 7
- **API Client:** Axios
- **Payments:** PayPal JavaScript SDK
- **Notifications:** Sonner
- **Icons:** React Icons

### Backend

- **Environment:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) & Bcryptjs
- **File Handling:** Multer & Cloudinary
- **Deployment:** Configured for Vercel

---

## ✨ Features

### User Features

- **Authentication:** Secure Login and Registration.
- **Product Catalog:** Browse products by categories, filter by size, color, price, and brand.
- **Search:** Real-time product search functionality.
- **Cart Management:** Add/Remove items, update quantities, and persist cart data.
- **Checkout:** Seamless checkout process with PayPal integration.
- **Order Tracking:** View order history and detailed order status.
- **Profile:** Manage user profile information.

### Admin Features

- **Dashboard:** Overview of store performance.
- **User Management:** View and manage registered users.
- **Product Management:** Full CRUD operations for products (Create, Read, Update, Delete).
- **Order Management:** Track and update status of all customer orders.
- **Image Upload:** Upload product images directly to Cloudinary.

---

## 📂 Project Structure

```text
rabbit/
├── backend/                # Express Server & API
│   ├── config/             # Database & Config files
│   ├── controllers/        # Request handling logic (if applicable)
│   ├── middleware/         # Auth & error handling middlewares
│   ├── models/             # Mongoose schemas (User, Product, Order, etc.)
│   ├── routes/             # API endpoint definitions
│   ├── server.js           # Entry point
│   └── vercel.json         # Backend deployment config
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Admin, Cart, Layout, etc.)
│   │   ├── pages/          # Main application pages
│   │   ├── redux/          # Redux slices and store configuration
│   │   ├── App.jsx         # Routing and Main layout
│   │   └── main.jsx        # Entry point
│   ├── vite.config.js      # Vite configuration
│   └── vercel.json         # Frontend deployment config
└── README.md               # Project documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js installed
- MongoDB database (Local or Atlas)
- Cloudinary Account (for image uploads)
- PayPal Developer Account (for payments)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   PORT=9000
   MONGO_URL=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:9000
   VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```
4. Start the application:
   ```bash
   npm run dev
   ```

---

## 🌐 API Endpoints

### Public / User

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate user
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product details

### Protected (User)

- `GET /api/cart` - Get user cart
- `POST /api/checkout` - Initialize checkout
- `GET /api/orders/my-orders` - Get user's order history

### Admin

- `GET /api/admin/users` - List all users
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/orders/:id` - Update order status

---

## 📄 License

This project is licensed under the ISC License.
