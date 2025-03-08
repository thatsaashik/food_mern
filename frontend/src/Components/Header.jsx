import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import Modal from "../Model";
import Cart from "../Pages/Cart.jsx";
import { useCart } from "../Components/ContextReducer";

const Header = () => {
  const [cartView, setCartView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useCart();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/LogIn");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left Section: "Foodies" Logo */}
        <div className="flex items-center">
          <span className="text-4xl font-bold font-serif text-orange-600">
            Foodies
          </span>
          <div className="ml-7">
          <ul className="hidden lg:flex  items-center gap-8 text-lg font-medium text-gray-800">
          {localStorage.getItem("authToken") && (
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-200"
              >
                Home
              </Link>
            </li>
          )}
          {localStorage.getItem("authToken") && (
            <li>
              <Link
                to="/MyOrder"
                className="hover:text-blue-600 transition duration-200"
              >
                My Order
              </Link>
            </li>
          )}
        </ul>
          </div>
        </div>

        {/* Left Menu - Links */}
  

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-6">
          {!localStorage.getItem("authToken") ? (
            <>
              <Link
                to="/LogIn"
                className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow hover:shadow-md hover:bg-blue-600 transition duration-200"
              >
                Log In
              </Link>
              <Link
                to="/SignIn"
                className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold shadow hover:shadow-md hover:bg-green-600 transition duration-200"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div
                onClick={() => setCartView(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold shadow hover:shadow-md hover:bg-gray-300 cursor-pointer transition duration-200"
              >
                <BsCart size={20} />
                <span>My Cart</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                  {data.length}
                </span>
              </div>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
              <div
                onClick={handleLogOut}
                className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold shadow hover:shadow-md hover:bg-red-600 cursor-pointer transition duration-200"
              >
                Log Out
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="lg:hidden text-gray-800 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-100 shadow-md p-4">
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-800">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li>
                <Link
                  to="/MyOrder"
                  className="hover:text-blue-600 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  My Order
                </Link>
              </li>
            )}
            {!localStorage.getItem("authToken") ? (
              <>
                <li>
                  <Link
                    to="/LogIn"
                    className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow hover:shadow-md hover:bg-blue-600 transition duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/SignIn"
                    className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold shadow hover:shadow-md hover:bg-green-600 transition duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div
                    onClick={() => {
                      setMenuOpen(false);
                      setCartView(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-semibold shadow hover:shadow-md hover:bg-gray-400 cursor-pointer transition duration-200"
                  >
                    <BsCart size={20} />
                    <span>My Cart</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                      {data.length}
                    </span>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogOut();
                    }}
                    className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold shadow hover:shadow-md hover:bg-red-600 cursor-pointer transition duration-200"
                  >
                    Log Out
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
