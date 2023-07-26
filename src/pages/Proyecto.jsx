import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

const Proyecto = () => {
  const params = useParams();
  const { id } = params;

  const { obtenerProyecto } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  return <div>Proyecto</div>;
};

export default Proyecto;
