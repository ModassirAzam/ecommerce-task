import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../utils/product.css";

const Product = ({ cart, setCart }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    console.log("Cart element = ", cart);
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const fetchMyData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products`);
      console.log("API Response:", response.data);
      if (response.data.status && response.data.result.length > 0) {
        setItems(response.data.result);
      } else {
        console.error("No product data available or status is false.");
        setError("No product data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch product data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => (
            <div
              key={product.ProductId}
              className="col-lg-4 col-md-6 my-3 text-center"
            >
              <div
                className="card h-100 d-flex flex-column justify-content-between"
                style={{ width: "18rem" }}
              >
                <Link
                  to={`/products/${product.ProductId}`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={product.productImage}
                    className="card-img-top product-image"
                    alt={product.ProductName}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.ProductName}</h5>
                  <p className="card-text">{product.ProductDescription}</p>
                  <div className="mt-auto">
                    <button className="btn btn-primary mx-3">
                      {product.ProductPrice} ₹
                    </button>
                    <button
                      onClick={() =>
                        addToCart(
                          product.ProductId,
                          product.ProductPrice,
                          product.ProductName,
                          product.ProductDescription,
                          product.productImage
                        )
                      }
                      className="btn btn-warning"
                    >
                      Add To Cart
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
