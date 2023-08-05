import React, { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
const FormularioColaborador = () => {
  // State para el proyecto
  const [email, setEmail] = useState("");

  // Hooks
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if (email.trim() === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    submitColaborador(email);
  };

  const { msg } = alerta;
  return (
    <form
      className="bg-white py-10 px-5 w-full lg:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label className="text-gray-700 text-sm font-bold" htmlFor="email">
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email Colaborador"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="bg-sky-600 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-sky-800 cursor-pointer transition-colors rounded"
        value="Buscar Colaborador"
      />
    </form>
  );
};

export default FormularioColaborador;
