import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// Variable Global para tener acceso al socket
let socket;

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
  const [tarea, setTarea] = useState([]);
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);

  // State Colaborador
  const [colaborador, setColaborador] = useState({});

  const [proyectoCreadoEliminado, setProyectoCreadoEliminado] = useState(false);
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);

  const [buscador, setBuscador] = useState(false);

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

  // UseEffect para obtener el Socket
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
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
    // console.log("Elimnando proyecto", id);
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

      setProyecto(data);
    } catch (error) {
      navigate("/proyectos");

      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const handleModalTarea = (modal = "") => {
    if (modal === "crear") {
      setModalFormularioTarea(!modalFormularioTarea);
    }
    if (modal === "editar") {
      setModalFormularioTarea(!modalFormularioTarea);
    }
    if (modal === "eliminar") {
      setModalEliminarTarea(!modalEliminarTarea);
    }

    setTarea({});
  };

  // Submit Tarea
  const submitTarea = async (tarea) => {
    if (tarea?.id !== "") {
      await editarTarea(tarea);
    } else {
      const { id, ...tareaSinId } = tarea;
      await crearTarea(tareaSinId);
    }
  };

  // Crear Tarea
  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(`/tareas`, tarea, config);

      // Pasa submitTareasProyecto (Socket IO)
      // const proyectoActualizado = { ...proyecto };
      // proyectoActualizado.tareas = [...proyecto.tareas, data];

      // setProyecto(proyectoActualizado);
      setAlerta({
        msg: "",
        error: false,
      });

      setModalFormularioTarea(false);

      // Socket IO
      socket.emit("nueva-tarea", data);
    } catch (error) {
      console.log(error);
    }
  };

  // Editar Tarea
  const editarTarea = async (tarea) => {
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
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      // Pasa actualizarTareaProyecto (Socket IO)
      socket.emit("actualizar-tarea", data);

      setAlerta({
        msg: "",
        error: false,
      });
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(true);
  };

  // Eliminar Tarea
  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      // Pasa a submitTareasProyecto (Socket IO)

      setModalEliminarTarea(false);
      setTarea({});

      // Socket IO
      socket.emit("eliminar-tarea", tarea);

      // Quitar alerta
      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitColaborador = async (email) => {
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

      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );

      setAlerta({
        msg: "",
        error: false,
      });

      // console.log(data);
      setColaborador(data);
    } catch (error) {
      console.error(error.response.data.msg);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setColaborador({});
      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Eliminar Colaborador de un proyecto
  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );

      const proyectoActualizado = { ...proyecto };

      // Filtrar los colaboradores del proyecto y quitar/filtrar al colaborador eliminada
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );

      setProyecto(proyectoActualizado);

      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlerta({
          msg: "",
          error: false,
        });
      }, 3000);
      setColaborador({});
      setModalEliminarColaborador(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const completarTarea = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );

      setTarea({});
      setAlerta({
        msg: "",
        error: false,
      });

      // Socket io
      socket.emit("cambiar-estado", data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  // Funciones para Socket.io
  const submitTareasProyecto = (tarea) => {
    // Agregar la tarea al state
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];

    setProyecto(proyectoActualizado);
  };

  const eliminarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    setProyecto(proyectoActualizado);
  };

  const actualizarTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  const cambiarEstadoTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto };

    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
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
        tarea,
        handleModalEditarTarea,
        modalEliminarTarea,
        handleModalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        modalEliminarColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        buscador,
        handleBuscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
