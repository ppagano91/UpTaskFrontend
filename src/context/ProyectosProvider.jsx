import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({
        msg: "",
        error: false,
      });
    }, 5000);
  };

  const sumbitProyecto = async (proyecto) => {
    console.log(proyecto);
  };

  return (
    <ProyectosContext.Provider
      value={{ proyectos, alerta, mostrarAlerta, sumbitProyecto }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
