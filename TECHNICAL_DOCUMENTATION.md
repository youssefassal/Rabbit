# Rabbit Project - Technical Documentation

This document provides a detailed technical deep dive into the architecture, state management, and implementation details of the Rabbit E-Commerce Platform.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Deep Dive](#frontend-deep-dive)
   - [State Management (Redux)](#state-management-redux)
   - [Routing & Security](#routing--security)
3. [Backend Deep Dive](#backend-deep-dive)
   - [Database Models](#database-models)
   - [Middleware](#middleware)
4. [Deployment](#deployment)

---

## 1. Architecture Overview

Rabbit follows a classic **client-server architecture**:

- **Frontend:** A Single Page Application (SPA) built with React. It communicates with the backend via a RESTful API.
- **Backend:** A Node.js application using Express to handle routing, business logic, and database interactions.
- **Database:** MongoDB stores all persistent data, including users, products, carts, and orders.

---

## 2. Frontend Deep Dive

### State Management (Redux)

The application uses **Redux Toolkit** for centralized state management. The store is divided into several slices:

| Slice               | Responsibility                                                   |
| ------------------- | ---------------------------------------------------------------- |
| `authSlice`         | Manages user authentication state, tokens, and profile data.     |
| `productsSlice`     | Handles product fetching, filtering, and single product details. |
| `cartSlice`         | Manages the shopping cart (items, quantities, and totals).       |
| `checkoutSlice`     | Handles the checkout process and temporary checkout data.        |
| `orderSlice`        | Manages user-specific order history and details.                 |
| `adminSlice`        | Admin-specific state for managing users.                         |
| `adminProductSlice` | Admin-specific state for CRUD operations on products.            |
| `adminOrderSlice`   | Admin-specific state for managing all platform orders.           |

### Routing & Security

- **React Router 7:** Handles navigation between pages.
- **Protected Routes:** A `ProtectedRoute` component wraps admin and user-sensitive pages to ensure only authorized users can access them.
  - Admin routes are further restricted by checking the user's `role`.

---

## 3. Backend Deep Dive

### Database Models (Mongoose)

The data layer is structured using the following schemas:

- **User:** Stores credentials (hashed with bcrypt), roles (user/admin), and profile info.
- **Product:** Contains product details (name, description, price, category, brand, colors, sizes, images).
- **Cart:** Links users to their selected products before purchase.
- **Order:** Records finalized transactions, including shipping details, payment status, and individual line items.
- **Checkout:** Temporary storage for checkout session data.
- **Subscriber:** Stores email addresses for the newsletter.

### Middleware

- **Auth Middleware:** Validates JWT tokens provided in the request headers to identify the user.
- **Admin Middleware:** Ensures the authenticated user has the 'admin' role before allowing access to sensitive endpoints.
- **Error Handling:** Standardized error responses across all API endpoints.

---

## 4. Key Implementation Details

### File Uploads

Product images are handled using **Multer** and uploaded to **Cloudinary**. This ensures efficient image hosting and resizing without taxing the application server's storage.

### Payment Integration

The platform integrates the **PayPal JavaScript SDK**. The flow is:

1. User initiates checkout.
2. Order details are prepared.
3. PayPal modal opens for payment.
4. On success, the backend is notified to create a permanent `Order` record and clear the `Cart`.

### Notifications

**Sonner** is used for toast notifications, providing elegant, non-intrusive feedback for actions like login success, items added to cart, and order completion.

---

## 5. Deployment

The project is configured for deployment on **Vercel**:

- `backend/vercel.json`: Handles serverless function routing and environment variables.
- `frontend/vercel.json`: Manages SPA routing to ensure `index.html` is served for all client-side routes.

---

## 6. Maintenance Commands

### Seed Data

To populate the database with initial sample data:

```bash
cd backend
npm run seed
```

### Build for Production

To create a production build of the frontend:

```bash
cd frontend
npm run build
```
