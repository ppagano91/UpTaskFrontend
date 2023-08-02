import React from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
  const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea;
  const admin = useAdmin();
  const handleStyles = (prioridad) => {
    switch (prioridad.toLowerCase()) {
      case "alta":
        return "bg-red-500";
      case "media":
        return "bg-yellow-500";
      case "baja":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="border-b p-5 flex flex-col lg:flex-row justify-between">
      <div className="ml-2 mr-5">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-md text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-md">{formatearFecha(fechaEntrega)}</p>
        <p
          className={`${handleStyles(
            prioridad
          )} mb-1 font-bold text-white w-fit px-2 py-1 rounded-md uppercase`}
        >
          {prioridad}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        {estado ? (
          <button className="bg-green-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completa
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incompleta
          </button>
        )}
        {admin && (
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEditarTarea(tarea)}
        >
          Editar
        </button>
        )}
        {admin && (
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          Eliminar
        </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
