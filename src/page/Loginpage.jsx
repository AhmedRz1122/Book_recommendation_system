import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Loginpage.css";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "/api/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status===200) {
        
        const { access_token } = response.data;
        
        // Store token in localStorage
        localStorage.setItem("token", access_token);
        
        // Set default Authorization header for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        
        // console.log("Login successful. Token:", access_token);
        navigate("/Home", { replace: true });  // Redirect to home on success
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="header_gradient bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-blue-100">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 text-left">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-shadow shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="button_gradient w-full h-10 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/Register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;