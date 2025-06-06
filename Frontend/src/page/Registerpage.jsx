import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Registerpage.css";

const Registerpage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "/api/signup",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status===201) {
        console.log("Registration successful:", response.data);
        navigate('/Login', { replace: true });  // Redirect to login
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again later.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="header_register bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Register User</h1>
          <p className="text-blue-100">Sign up to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 text-left">
              Username
            </label>
            <input
              id="username"
              type="text"
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-shadow shadow-sm"
              placeholder="Name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              name='email'
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
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-shadow shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="button_register w-full h-10 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/Login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;