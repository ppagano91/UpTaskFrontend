import React from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between items-center">
      <div className="ml-2 mr-5">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-md text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-md">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">{prioridad}</p>
      </div>
      <div className="flex gap-2">
        {estado ? (
          <button className="bg-green-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditarTarea(tarea)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
