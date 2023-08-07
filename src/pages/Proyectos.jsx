import React, { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";
import io from "socket.io-client";

let socket;

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("prueba");

    socket.on("respuesta", () => {
      console.log("Respuesta del servidor");
    });
    /*
    socket.on("proyecto-creado", (data) => {
      console.log(data);
    });
    socket.on("proyecto-actualizado", (data) => {
      console.log(data);
    });
    socket.on("proyecto-eliminado", (data) => {
      console.log(data);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
    */
  }, []);

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      {msg && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="text-gray-600 uppercase p-5">No hay proyectos</p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
