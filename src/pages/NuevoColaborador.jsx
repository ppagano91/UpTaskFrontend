import React, { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando } = useProyectos();

  const params = useParams();
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <>
      <h1 className="text-2xl font-black">Añadir Colaborador(a)</h1>
      <p className="text-m uppercase">
        Proyecto: {""}
        <span className="font-bold">{proyecto.nombre}</span>
      </p>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  );
};

export default NuevoColaborador;
