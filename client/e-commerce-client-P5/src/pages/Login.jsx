import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import "../style/login.css";

function Login() {
  const [logIsOk, setLogIsOk] = useState(false);

  const { register, handleSubmit } = useForm();



  const { singin, isAuthenticated, isLoggedError } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    let okSign = await singin(values);
    setLogIsOk(okSign);

    setTimeout(() => {
      if (okSign) {
        navigate("/");
      }
    }, 2000);
  });
  if (logIsOk)
    return <div style={{ marginTop: "100px" }}> Logeo exitoso! </div>;
  return (
    <section>
      <div className="container-login">


        <h1 className="title-login">Ingrese credenciales para loggear</h1>

        <form onSubmit={onSubmit} className="form-input">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="input-login"
          ></input>

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input-login"
          ></input>

          <button type="submit" className="button">
            Login
          </button>
        </form>

        {isLoggedError && <span>Error de credenciales</span>}
      </div>
    </section>
  );
}

export default Login;
