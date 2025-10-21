import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
  markOrderPaidAndDelivered,
} from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, navigate, user]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const handleMarkPaidAndDelivered = (orderId) => {
    dispatch(markOrderPaidAndDelivered(orderId));
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Reverse orders so latest appears first
  const reversedOrders = [...orders].reverse();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
        <table className="min-w-full text-left text-gray-500 divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Order Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reversedOrders.length > 0 ? (
              reversedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user?.name || "Unknown"}</td>
                  <td className="p-4">
                    ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "text-green-700 bg-green-100"
                          : "text-yellow-700 bg-yellow-100"
                      } px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "Delivered")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                      >
                        Mark Delivered
                      </button>
                      <button
                        onClick={() => handleMarkPaidAndDelivered(order._id)}
                        disabled={order.isPaid && order.status === "Delivered"}
                        className={`px-4 py-2 rounded text-sm ${
                          order.isPaid && order.status === "Delivered"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        Paid & Delivered
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* mobile view */}
      <div className="md:hidden mt-6 space-y-4">
        {reversedOrders.length > 0 ? (
          reversedOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p className="font-bold">Order ID: #{order._id}</p>
              <p className="text-gray-500 my-2">
                Customer: {order.user?.name || "Unknown"}
              </p>
              <p className="text-gray-500 my-2">
                Total Price: ${order.totalPrice}
              </p>
              <div className="my-2">
                <span
                  className={`${
                    order.isPaid
                      ? "text-green-700 bg-green-100"
                      : "text-yellow-700 bg-yellow-100"
                  } px-3 py-1 rounded-full text-xs font-medium`}
                >
                  Payment: {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(order._id, "Delivered")}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
                >
                  Mark Delivered
                </button>
                <button
                  onClick={() => handleMarkPaidAndDelivered(order._id)}
                  disabled={order.isPaid && order.status === "Delivered"}
                  className={`flex-1 px-4 py-2 rounded text-sm ${
                    order.isPaid && order.status === "Delivered"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Paid & Delivered
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
