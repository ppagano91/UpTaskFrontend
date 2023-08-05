import React from "react";
import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useProyectos();
  const {
    nombre,
    descripcion,
    prioridad,
    fechaEntrega,
    estado,
    _id,
    completado,
  } = tarea;
  const admin = useAdmin();
  console.log(completado);

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
    <div className="border-b p-5 flex justify-between items-center">
      <div className="ml-2 mr-5 flex-col items-start">
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
        {estado && completado?.nombre && completado.nombre.trim() !== "" && (
          <div className="flex items-start">
            {" "}
            <p className="mb-1 text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
              Completada por: {completado.nombre}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <button
          className={`${
            estado ? "bg-green-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

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
