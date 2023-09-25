import React, { useContext } from "react";
import axios from "axios";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "../style/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ setShowCart }) => {
  const { cartItems } = useContext(CartContext);
  const { user, signout } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleCartClick = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    axios
      .post("http://localhost:5001/api/logout")
      .then(() => {
        signout();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h2>
          <Link to="/" style={{ color: "red" }}>
            <span>TuRopita</span>
          </Link>
        </h2>
      </div>
      <div className="navbar__icons">
        <ul>
          <li>
            {!user ? (
              <>
                <Link to="/register">
                  <button
                    className="button-register-navbar
                  "
                  >
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="button-login-navbar">Login</button>
                </Link>
                <button onClick={handleCartClick} className="navbar_button">
                  <FaShoppingCart />
                  {cartItemCount > 0 && (
                    <span className="cart-item-count">{cartItemCount}</span>
                  )}
                </button>
              </>
            ) : (
              <div>
                <Link to="/create">
                  <button className="button-login-navbar ">
                    Crear producto
                  </button>
                </Link>
                <button onClick={handleLogout} className="button-login-navbar ">
                  Logout
                </button>
                <Link to="/profile">
                  <button className="navbar_button">
                    <FaUser />
                  </button>
                </Link>
                <button onClick={handleCartClick} className="navbar_button">
                  <FaShoppingCart />
                  {cartItemCount > 0 && (
                    <span className="cart-item-count">{cartItemCount}</span>
                  )}
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
