import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const handleSumbit = (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 8) {
      setAlerta({
        msg: "La contraseña debe tener al menos 8 caracteres",
        error: true,
      });
      return;
    }


    
    setAlerta({
      msg: "",
      error: false,
    });





  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSumbit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase block text-slate-700 font-bold text-xl"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl border-gray-300 bg-gray-50 focus:outline-none focus:border-sky-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase block text-slate-700 font-bold text-xl"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl border-gray-300 bg-gray-50 focus:outline-none focus:border-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase block text-slate-700 font-bold text-xl"
          >
            Confirmar Password
          </label>
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirmar Password"
            className="w-full mt-3 p-3 border rounded-xl border-gray-300 bg-gray-50 focus:outline-none focus:border-sky-500"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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
          to={"/recuperar-password"}
        >
          Olvidé Mi Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
