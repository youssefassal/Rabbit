# Rabbit Backend API

The backend API for the Rabbit E-Commerce application.

## Environment Variables

Create a `.env` file in the root of the `backend` directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Scripts

- `npm start`: Start the server in production mode.
- `npm run dev`: Start the server in development mode with Nodemon.
- `npm run seed`: Seed the database with initial data.

## API Endpoints

### Users

- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login user
- `GET /api/users/profile`: Get user profile (Protected)

### Products

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get single product

### Orders

- `POST /api/orders`: Create a new order (Protected)
- `GET /api/orders/my-orders`: Get logged-in user's orders (Protected)

### Admin

- `GET /api/admin/users`: Get all users (Admin only)
- `GET /api/admin/orders`: Get all orders (Admin only)
