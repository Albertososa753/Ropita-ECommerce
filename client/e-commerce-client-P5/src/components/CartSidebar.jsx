import React, { useContext } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "../style/cartSidebar.css";
import { Link, useNavigate } from "react-router-dom";

const CartSidebar = ({ onClose }) => {
  const { cartItems, handleRemoveFromCart, handleUpdateQuantity } =
    useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    handleRemoveFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      handleUpdateQuantity(productId, quantity);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const cartTotal = calculateTotal();
  const validItems = cartItems.filter((item) => item.quantity > 0);

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="cart-sidebar">
      <div>
        <h2 className="title">Mi Compra</h2>
        <button className="close-button -" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="cart-sidebar-container">
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="product-list">
              <img src={item.img_url} alt={item.name} className="buy-image" />
              <div className="name-quantity-container">
                <h3 className="name">{item.name}</h3>
                <div className="quantity-container">
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-button-rigth"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="price">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="buy-container">
        <p className="cart-total">Total: ${cartTotal.toLocaleString()}</p>
        {!isAuthenticated && (
          <Link to="/login" className="button-link">
            Iniciar Sesión Para Comprar
          </Link>
        )}
        {isAuthenticated && (
          <button className="button-link" onClick={handleCheckout}>
            Iniciar Compra
          </button>
        )}
        <button className="continue-shopping-button" onClick={onClose}>
          Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
