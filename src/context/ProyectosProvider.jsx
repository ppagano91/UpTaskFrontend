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

  const navigate = useNavigate();

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
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });
      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
        navigate("/proyectos");
      }, 3000);
      console.log(error);

      console.log(data);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
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
