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

  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);

  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

  const [proyectoCreadoEliminado, setProyectoCreadoEliminado] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/proyectos", config);
        setProyectos(data.proyectos);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProyectos();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({
        msg: "",
        error: false,
      });
    }, 3000);
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      const { id, ...proyectoSinId } = proyecto;
      await nuevoProyecto(proyectoSinId);
    }

    return;
  };

  // Función para editar proyecto
  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      console.log(data);

      // Sincronizar el state
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      // console.log(proyectosActualizados);
      setProyectos(proyectosActualizados);

      // Mostrar alerta
      setAlerta({
        msg: "Proyecto actualizado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
        navigate("/proyectos");
      }, 3000);

      // TODO: Redireccionar
    } catch (error) {
      console.log(error);
    }
  };

  // Función para crear nuevo proyecto
  const nuevoProyecto = async (proyecto) => {
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

      setProyectos([...proyectos, data]);

      setAlerta({
        msg: "Proyecto creado correctamente",
        error: false,
      });
      setProyectoCreadoEliminado(true);

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
        setProyectoCreadoEliminado(false);
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Función para eliminar proyecto
  const eliminarProyecto = async (id) => {
    console.log("Elimnando proyecto", id);
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      // // Sincronizar el state
      const proyectosActualizados = proyectos.filter(
        (proyecto) => proyecto._id !== id
      );
      setProyectos(proyectosActualizados);
      setProyectoCreadoEliminado(true);

      // Mostrar alerta
      setAlerta({
        msg: "Proyecto eliminado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
        setProyectoCreadoEliminado(false);
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener Proyecto
  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
      // console.log(data);

      setProyecto(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
  };

  // Crear Tarea
  const submitTarea = async (tarea) => {
    console.log(tarea);
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        proyecto,
        alerta,
        cargando,
        mostrarAlerta,
        submitProyecto,
        obtenerProyecto,
        eliminarProyecto,
        proyectoCreadoEliminado,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
