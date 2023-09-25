import React, { useContext, useEffect, useState } from "react";
import "../style/profile.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/me`)
      .then((e) => {
        const data = e.data;
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  if (isLoading) return <div style={{ marginTop: "100px" }}>Cargando...</div>;
  return (
    <div className="container">
      <div className="grid">
        <div className="user-image-container">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt="user"
            className="user-image"
          />
          <h2>{userData.name}</h2>
          <h2>{userData.lastname}</h2>
        </div>
        <div className="info-personal-container">
          <p>{userData.name}</p>
          <p>{userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
