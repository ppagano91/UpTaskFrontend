import React from "react";
import useProyectos from "../hooks/useProyectos";

const Proyectos = () => {
  const { proyectos } = useProyectos();

  // console.log(proyectos);
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ? (
          "Hay proyectos"
        ) : (
          <p className="text-gray-600 uppercase">No hay proyectos</p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
