import React from "react";
import { Link } from "react-router-dom";

const Registrar = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
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
