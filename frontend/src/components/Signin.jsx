import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [loginStatus, setLoginStatus] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const res = await fetch(`http://localhost:3000/auth/signin`,{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.message){
          setLoginStatus(data.message);
        }
        else{
          localStorage.setItem("token", data.token)
          navigate('/');
        }
      }catch(error){
        console.log('Error is present while login',error);
      }
    }

  return (
    <div className="min-w-screen min-h-screen bg-slate-100 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              <p>Enter your information to login</p>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label for="" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                        id="email"
                          onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label for="" className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                        id="password"
                          onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className="block w-full max-w-xs mx-auto bg-black hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 mt-3 font-semibold">
                      LOGIN NOW
                    </button>
                    <Link to={"/signup"}>
                      <h2 className="flex items-center justify-center my-4 ">
                        Don't have an account ? &nbsp;Signup
                      </h2>
                    </Link>
                  </div>
                </div>
                <h1 classNameName=" text-red-500 text-lg flex items-center justify-center">{loginStatus}</h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
