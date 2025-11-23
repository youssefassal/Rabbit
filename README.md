# Rabbit E-Commerce Project

A full-stack E-Commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

- `frontend/`: React application with Vite and Tailwind CSS.
- `backend/`: Node.js and Express API server.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd rabbit
    ```

2.  **Install dependencies:**

    _Frontend:_

    ```bash
    cd frontend
    npm install
    ```

    _Backend:_

    ```bash
    cd backend
    npm install
    ```

### Running the Application

1.  **Start the Backend:**
    Create a `.env` file in the `backend` directory (see `backend/README.md` for details).

    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

## Features

- User Authentication (Login/Register)
- Product Browsing and Searching
- Shopping Cart
- Checkout Process
- Admin Dashboard (Manage Users, Products, Orders)
