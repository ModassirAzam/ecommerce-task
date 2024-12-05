import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
  
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); 
        console.log(token);
        if (!token) {
          throw new Error("Session Expired , Please login again !! ");
        }
        const response = await axios.get("http://localhost:3000/auth/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log(response.data.result);
        setOrders(response.data.result);
        
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    useEffect(() => {
      fetchOrders();
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <div clas>
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <ul>
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Product Name</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Product Description</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Product Price</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
            {orders.map((order) => (         
            <div className="overflow-x-auto flex items-center justify-center">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <tbody key={order.productPrice} className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{order.productName}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.productDescription}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{order.productPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            ))}
          </ul>
        )}
      </div>
    );
}

export default Orders