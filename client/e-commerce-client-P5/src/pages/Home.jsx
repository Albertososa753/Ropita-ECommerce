import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/home.css";
import Cards from "../components/Cards";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };
  useEffect(() => {
    let timer;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        const filteredProducts = response.data.filter(
          (product) =>
            product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .startsWith(searchTerm.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };

    timer = setTimeout(() => {
      fetchData();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  return (
    <div>

      <div
        className="conteiner"
        style={{ display: "flex", justifyContent: "center"}}
      >

        <div>
          <form>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar producto..."
              className="search-button"
            />
          </form>
        </div>
      </div>
      <div className="conteiner">
        {products.map((item, index) => (
          <Cards key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
