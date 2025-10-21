import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-2 sm:py-3">image</th>
              <th className="px-4 py-2 sm:py-3">order id</th>
              <th className="px-4 py-2 sm:py-3">created</th>
              <th className="px-4 py-2 sm:py-3">shipping address</th>
              <th className="px-4 py-2 sm:py-3">items</th>
              <th className="px-4 py-2 sm:py-3">price</th>
              <th className="px-4 py-2 sm:py-3">status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()} -{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    ${order.totalPrice}
                  </td>
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`${
                          order.isPaid
                            ? "text-green-700 bg-green-100"
                            : "text-yellow-700 bg-yellow-100"
                        } px-2 py-1 rounded-full text-xs font-medium text-center`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                      <span
                        className={`${
                          order.status === "Delivered"
                            ? "text-green-700 bg-green-100"
                            : order.status === "Cancelled"
                            ? "text-red-700 bg-red-100"
                            : order.status === "Shipped"
                            ? "text-blue-700 bg-blue-100"
                            : "text-gray-700 bg-gray-100"
                        } px-2 py-1 rounded-full text-xs font-medium text-center`}
                      >
                        {order.status || "Processing"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-gray-500 text-center">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
