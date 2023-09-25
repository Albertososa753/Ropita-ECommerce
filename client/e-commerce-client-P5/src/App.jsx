import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";

//Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import Searcher from "./pages/Home";

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => {
    setShowCart(false);
  };

  return (
    <div>
      <Navbar setShowCart={setShowCart} />
      {showCart && <CartSidebar onClose={handleCartClose} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </div>
  );
};

export default App;
