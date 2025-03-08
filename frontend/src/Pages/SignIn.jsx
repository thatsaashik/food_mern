import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [data, setData] = useState({ name: "", password: "", email: "", Geolocation: "" });

  const HandleEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/UserRouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          location: data.Geolocation,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        alert(json.error || "Something went wrong.");
      } else {
        console.log("Success:", json);
        alert("Signed up successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <section className="bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-4xl">
        {/* Left Section with Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="data:image/jpeg;base64,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"
            alt="Sign In Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Section with Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Your Account
            </h1>
            <p className="text-gray-600">Sign up to start ordering delicious food</p>
          </div>
          <form className="space-y-6" onSubmit={HandleEvent}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full text-black mt-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full text-black mt-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full text-black mt-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="Geolocation"
                value={data.Geolocation}
                onChange={(e) =>
                  setData({ ...data, Geolocation: e.target.value })
                }
                className="w-full text-black mt-1 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-pink-400"
                placeholder="Enter your address"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/Login" className="text-pink-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
