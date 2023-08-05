import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();

  const { nombre, _id, cliente, creador } = proyecto;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 flex-col md:items-start lg:flex-row">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 uppercase">
            {""}- {cliente}
          </span>
        </p>
        <div>
          {auth._id !== creador ? (
            <p className="p-1 text-xs rounded-lg text-white bg-green-500 uppercase">
              Colaborador
            </p>
          ) : (
            <p className="p-1 text-xs rounded-lg text-white bg-sky-500 uppercase">
              Creador
            </p>
          )}
        </div>
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase hover:font-bold transition-all duration-300 text-center"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
