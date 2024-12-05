import React from "react";
import { Link } from "react-router-dom";

function handleLogout() {
  localStorage.removeItem("token");
}

const Payment = () => {
  return (
    <>
      <h3>Order placed successfully!!</h3>
      <Link
        to={`/orders`}
        style={{
          textDecoration: "none",
          display: "flex",
          marginTop: "12px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="btn btn-primary">See Placed Orders</button>
      </Link>

      <Link
        onClick={handleLogout}
        to={`/signin`}
        style={{
          marginTop:"2rem",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="btn btn-danger deco">Logout</button>
      </Link>
    </>
  );
};

export default Payment;
