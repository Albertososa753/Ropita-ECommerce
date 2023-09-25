import { Link } from "react-router-dom";
import "../style/card.css";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Cards = ({ item }) => {
  const { handleAddToCart } = useContext(CartContext);

  const handleBuyClick = (product) => {
    handleAddToCart(product);
  };
  return (
    <div className="card">
      <Link to={`/product/${item.id}`} className="card-link">
        <img src={item.img_url} alt={item.name} className="card-image" />
        <div className="card-content">
          <h3 className="card-name">{item.name}</h3>
          <p className="card-price">${item.price}</p>
          <p className="card-description">{item.description}</p>
        </div>
      </Link>
      <button className="boton" onClick={() => handleBuyClick(item)}>Comprar</button>
    </div>
  );
};

export default Cards;
