import { useParams } from "react-router-dom";
import Card from "../components/Card";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [productId, setProductId] = useState({});
  const paramProduct = useParams();
  const id = paramProduct.id;
  useEffect(() => {
    axios.get(`http://localhost:5001/api/products/${id}`).then((prodId) => {
      setProductId(prodId.data);
    });
  }, []);

  return (
    <div>
      <Card product={productId} />
    </div>
  );
};

export default Product;
