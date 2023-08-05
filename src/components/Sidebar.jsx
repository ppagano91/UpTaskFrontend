import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">
        Hola {localStorage.getItem("nombre")}!
      </p>
      <Link
        className="block bg-sky-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg"
        to="crear-proyecto"
      >
        + Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
