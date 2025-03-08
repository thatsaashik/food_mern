import React, { useEffect, useState, useCallback } from "react";
import Header from "../Components/Header";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrder = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/MyOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("UserEmail"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data?.orderData) {
        throw new Error("Invalid order data received.");
      }

      const filteredOrders = data.orderData
        .map((orderGroup) => ({
          orderDate: orderGroup[0]?.Order_date || "Unknown",
          items: orderGroup.filter((item) => item?.name),
        }))
        .filter((orderGroup) => orderGroup.items.length > 0);

      setOrderData(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyOrder();
  }, [fetchMyOrder]);

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-300 to-orange-700 text-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-center text-4xl font-bold mb-8 text-black">My Orders</h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg mt-10">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg mt-10">{error}</p>
        ) : orderData.length > 0 ? (
          <div className="space-y-8">
            {orderData.map((orderGroup, groupIndex) => (
              <div key={groupIndex} className="bg-white shadow-lg rounded-xl p-6 transition-all hover:scale-105">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Order Date: <span className="text-orange-500 font-bold">{orderGroup.orderDate}</span>
                </h3>
                <div className="text-lg font-bold text-gray-700 mb-4">Order #{groupIndex + 1}</div>

                <div className="space-y-4">
                  {orderGroup.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-orange-100 p-4 rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
                    >
                      <div className="text-gray-800">
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-sm"><strong>Quantity:</strong> {item.qut} | <strong>Size:</strong> {item.size}</p>
                      </div>
                      <div className="text-xl font-bold text-orange-600">₹{item.price}/-</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
}
