import React from "react";
import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionUsuario } = useAuth();
  const handleCerrarSesion = () => {
    cerrarSesionUsuario();
    cerrarSesionProyectos();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header className="px-4 py-5 bg-white border-b ">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleBuscador}
          >
            Buscar Proyectos
          </button>
          <Link className="font-bold uppercase" to="/proyectos">
            Proyectos
          </Link>
          <button
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:bg-sky-700 transition-colors duration-300"
            type="button"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
