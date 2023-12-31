import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import Spinner from "../components/Spinner";
import io from "socket.io-client";

let socket;

const Proyecto = () => {
  const params = useParams();
  const { id } = params;

  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTarea,
  } = useProyectos();
  const { nombre } = proyecto;

  const admin = useAdmin();

  // console.log(proyecto);

  useEffect(() => {
    obtenerProyecto(id);
  }, [id]);

  // Socket.io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir-proyecto", params.id);
  }, []);

  useEffect(() => {
    socket.on("tarea-agregada", (nuevaTarea) => {
      if (nuevaTarea.proyecto === proyecto?._id) {
        submitTareasProyecto(nuevaTarea);
      }
    });

    socket.on("tarea-eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada);
      }
    });

    socket.on("tarea-actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada);
      }
    });

    socket.on("nuevo-estado", (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    });
  });

  // useEffect(() => {
  //   socket.on("respuesta", (data) => {
  //     console.log(data);
  //   });
  // });

  if (cargando) return <Spinner />;

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-between ">
        <h1 className="font-black text-4xl">{nombre}</h1>
        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <Link
              to={`/proyectos/editar/${id}`}
              className="uppercase font-bold"
            >
              Editar
            </Link>
          </div>
        )}
      </div>

      {admin && (
        <button
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center hover:bg-sky-600 transition-all duration-300"
          onClick={() => handleModalTarea("crear")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Nueva Tarea
        </button>
      )}
      <div className="flex justify-between items-center mt-10">
        <p className="font-bold text-xl">Tareas del Proyecto</p>

        <p className="text-gray-400 text-sm">
          Cantidad de tareas:{" "}
          <span className="font-bold text-gray-600">
            {proyecto.tareas?.length}
          </span>
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>
      <div className="bg-white shadow mt-5 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 text-gray-400 p-10">
            No hay tareas en este proyecto
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex justify-between items-center mt-10">
            <p className="font-bold text-xl">Colaboradores</p>

            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="text-gray-400 uppercase font-bold hover:text-black transition-all duration-300"
            >
              + Añadir
            </Link>
          </div>
          <div className="bg-white shadow mt-5 rounded-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores?.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 text-gray-400 p-10">
                No hay colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
