import React, { useContext } from "react";
import useInput from "../hooks/productInput";
import axios from "axios";
import "../style/cardDescript.css";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Card = ({ product }) => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const name = useInput();
  const quantity = useInput();
  const price = useInput();
  const description = useInput();
  const description_long = useInput();
  const img_url = useInput();
  const img_url_descript = useInput();
  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5001/api/products/${id}`)
      .then((ress) => {
        console.log("producto eliminado", ress);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5001/api/products/editProduct/${id}`, {
        name: name.value,
        quantity: quantity.value,
        price: price.value,
        description: description.value,
        description_long: description_long.value,
        img_url: img_url.value,
        img_url_descript: img_url_descript.value,
      })
      .then((ress) => {
        console.log("producto modificado", ress);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="images">
        <img src={`${product.img_url}`} alt={product.name} />
        <img src={`${product.img_url_descript}`} alt={product.name} />
      </div>
      <div className="containerDescrip">
        <h3>{product.name}</h3>

        <p id="precio">{`$ ${product.price}`}</p>
        <p>{product.description_long}</p>
      </div>
      <Link to="/">
        <button>
          <IoMdArrowBack />
        </button>
      </Link>
      <div>
        {user.isAdmin ? (
          <div className="container-admin">
            <form onSubmit={handleSubmit} className="form-admin">
              <input
                type="text"
                placeholder="name"
                {...name}
                className="form-input-admin"
              />
              <input
                type="number"
                placeholder="quantity"
                {...quantity}
                className="form-input-admin"
              />
              <input
                type="text"
                placeholder="price"
                {...price}
                className="form-input-admin"
              />
              <input
                type="text"
                placeholder="description"
                {...description}
                className="form-input-admin"
              />
              <input
                type="text"
                placeholder="description_long"
                {...description_long}
                className="form-input-admin"
              />
              <input
                type="text"
                placeholder="img_url"
                {...img_url}
                className="form-input-admin"
              />
              <input
                type="text"
                placeholder="img_url_descript"
                {...img_url_descript}
                className="form-input-admin"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="button-send"
              >
                enviar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="button-delete"
              >
                delete
              </button>
            </form>
          </div>
        ) : (
          <>
            <Link to="/">
              <button>
                <IoMdArrowBack />
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Card;
