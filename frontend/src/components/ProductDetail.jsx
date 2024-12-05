import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../utils/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      if (response.data.status && response.data.result.length > 0) {
        const fetchedProduct = response.data.result.find(
          (prod) => prod.ProductId == id
        );
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found");
        }
      } else {
        setError("No product data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch product data. Please try again later.");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="loading-message">Loading...</div>;
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
      <div className="product-detail container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 product-card">
            <div className="row">
              <div className="col-lg-6 text-center">
                <img
                  src={product.productImage}
                  alt={product.ProductName}
                  className="product-image img-fluid"
                />
              </div>
              <div className="col-lg-6">
                <h1 className="product-title">{product.ProductName}</h1>
                <p className="product-description">
                  {product.ProductDescription}
                </p>
                <p className="product-price">
                  <strong>Price:</strong> ₹{product.ProductPrice}
                </p>
                <p className="product-rating">
                  <strong>Rating:</strong> ⭐ {product.ProductRating}
                </p>
                <button
                  className="btn btn-warning add-to-cart-btn"
                  onClick={() =>
                    toast.success("Product added to cart!", { theme: "dark" })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
