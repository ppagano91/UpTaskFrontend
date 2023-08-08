import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    // si el input es de tipo text y no es un email válido
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regexEmail.test(email)) {
      setAlerta({
        msg: "El email no es válido",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/recuperar-password`, {
        email,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      console.log(error.response);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase block text-slate-700 font-bold text-xl"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl border-gray-300 bg-gray-50 focus:outline-none focus:border-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Recuperar Acceso"
          className=" bg-sky-700 w-full mb-5 py-3 text-slate-50  uppercase rounded-full font-bold hover:bg-sky-800 hover:cursor-pointer transition-colors duration-300"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-2 text-slate-500 uppercase text-sm"
          to={"/"}
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-2 text-slate-500 uppercase text-sm"
          to={"/registrar"}
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default RecuperarPassword;
