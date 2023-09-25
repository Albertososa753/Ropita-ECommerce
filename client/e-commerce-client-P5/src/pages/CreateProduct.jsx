import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/createProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    description_long: "",
    img_url: null,
    img_url_descript: null,
  });
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(URL.createObjectURL(file));
      setProductData((prevData) => ({
        ...prevData,
        img_url: file, // Guardar el archivo de imagen completo
      }));
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(URL.createObjectURL(file));
      setProductData((prevData) => ({
        ...prevData,
        img_url_descript: file, // Guardar el archivo de imagen completo
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("quantity", "10");
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("description_long", productData.description_long);
    formData.append("img_url", productData.img_url);
    formData.append("img_url_descript", productData.img_url_descript);

    toast.success("¡Compra realizada con éxito!");
    console.log("Datos del producto:", Object.fromEntries(formData));

    const data = JSON.stringify(Object.fromEntries(formData));

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5001/api/products/addProduct",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
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
      <h2>Agrega un producto</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Nombre del Producto"
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Descripcion Breve"
        />
        <input
          type="text"
          name="description_long"
          value={productData.description_long}
          onChange={handleChange}
          placeholder="Descripcion"
        />
        <input type="file" name="img_url" onChange={handleImageChange1} />
        {previewImage1 && (
          <img
            src={previewImage1}
            alt="Preview 1"
            style={{ maxWidth: "100px" }}
          />
        )}

        <input
          type="file"
          name="img_url_descript"
          onChange={handleImageChange2}
        />
        {previewImage2 && (
          <img
            src={previewImage2}
            alt="Preview 2"
            style={{ maxWidth: "100px" }}
          />
        )}

        <button type="submit">Crear</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default CreateProduct;
