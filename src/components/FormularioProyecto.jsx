import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  // State para proyecto
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const {
    alerta,
    mostrarAlerta,
    submitProyecto,
    proyecto,
    proyectoCreadoEliminado,
  } = useProyectos();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el proyecto
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      console.log("Todos los campos son obligatorios");
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Pasar los datos al Provider
    await submitProyecto({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
    });

    // Reiniciar el form
    // setId(null);
    // setNombre("");
    // setDescripcion("");
    // setFechaEntrega("");
    // setCliente("");
  };

  const { msg } = alerta;
  return (
    <form
      className="bg-white py-5 px-5 md:w-3/5 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {!proyectoCreadoEliminado && (
        <>
          <div className="mb-5">
            <label
              htmlFor="nombre"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Nombre Proyecto
            </label>
            <input
              type="text"
              id="nombre"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre del proyecto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="descripcion"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Descripción del proyecto"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="fecha-entrega"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Fecha de Entrega
            </label>
            <input
              type="date"
              id="fecha-entrega"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="cliente"
              className="text-gray-700 uppercase font-bold text-sm"
            >
              Nombre Cliente
            </label>
            <input
              type="text"
              id="cliente"
              className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre del Cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
        </>
      )}
      {msg && <Alerta alerta={alerta} />}
      {!proyectoCreadoEliminado && (
        <input
          type="submit"
          value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      )}
    </form>
  );
};

export default FormularioProyecto;
