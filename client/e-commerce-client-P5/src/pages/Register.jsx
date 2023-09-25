import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [regIsOk, setRegIsOk] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, isAuthenticated, isRegisterError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    let regOk = await singup(values);
    setRegIsOk(regOk);
    setTimeout(() => {
      if (regOk) {
        navigate("/login");
      }
    }, 2000);
  });
  if (regIsOk)
    return <div style={{ marginTop: "100px" }}> Registro exitoso! </div>;
  return (
    <section>
      <div className="container-register">
        <h1 className="title-register">Registro de usuario</h1>
        <form onSubmit={onSubmit} className="form-input">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="input-register"
          ></input>

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="input-register"
          ></input>

          <button className="button-register" type="submit">
            Register
          </button>
        </form>

        {isRegisterError && (
          <span>
            Usuario ya esta registrado, <Link to="/login">queres loggear?</Link>
          </span>
        )}
      </div>
    </section>
  );
}

export default Register;
