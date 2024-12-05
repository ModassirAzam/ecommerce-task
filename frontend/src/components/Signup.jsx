import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const Signup = () => {
//   const API_URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL_LOCAL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUserPresent, setIsUserPresent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateData = validate(formData);
    setFormErrors(validateData);
    if (Object.keys(validateData).some((key) => validateData[key] !== "")) {
      return;
    }
    setIsSubmit(true);
    try {
      const res = await fetch(`http://localhost:3000/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.status === 201 && data.message === "User created successfully!") {
        navigate("/signin");
      } else if (
        res.status === 409 &&
        data.message === "User already present with this email"
      ) {
        setIsUserPresent(true);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.first_name) {
      errors.first_name = "First name is required!";
    } else {
      errors.first_name = "";
    }

    if (!values.last_name) {
      errors.last_name = "Last name is required!";
    } else {
      errors.last_name = "";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    } else {
      errors.email = "";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else {
      errors.password = "";
    }
    return errors;
  };

  return (
    <div>
      <div class="min-w-screen min-h-screen bg-slate-100 flex items-center justify-center px-5 py-5">
        <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
            </div>
            <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div class="text-center mb-10">
                <h1 class="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>

              <div>
                <form>
                  <div class="flex -mx-3">
                    <div class="w-1/2 px-3 mb-5">
                      <label for="" class="text-xs font-semibold px-1">
                        First name
                      </label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i class="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="John"
                          id="first_name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p class="error">{formErrors.first_name}</p>
                    </div>
                    <div class="w-1/2 px-3 mb-5">
                      <label for="" class="text-xs font-semibold px-1">
                        Last name
                      </label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i class="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Smith"
                          id="last_name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p class="error">{formErrors.last_name}</p>
                    </div>
                  </div>
                  <div class="flex -mx-3">
                    <div class="w-full px-3 mb-5">
                      <label for="" class="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="email"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="johnsmith@example.com"
                          id="email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {isUserPresent && (
                        <p class="error">
                          User already present with this email
                        </p>
                      )}
                      <p class="error">{formErrors.email}</p>
                    </div>
                  </div>
                  <div class="flex -mx-3">
                    <div class="w-full px-3 mb-12">
                      <label for="" class="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div class="flex">
                        <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i class="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                          id="password"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <p class="error">{formErrors.password}</p>
                    </div>
                  </div>
                  <div class="flex -mx-3">
                    <div class="w-full px-3 mb-5">
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        class=" bg-black block w-full max-w-xs mx-auto bg-indigo-5 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      >
                        REGISTER NOW
                      </button>
                      <Link to={"/signin"}>
                        {" "}
                        <h2 className="flex items-center justify-center my-4">
                          Already have an account ?&nbsp;Login
                        </h2>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;