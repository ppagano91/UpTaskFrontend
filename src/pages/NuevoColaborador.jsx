import React, { useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";

const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    colaborador,
    agregarColaborador,
  } = useProyectos();

  const params = useParams();
  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  console.log(colaborador);

  // if (cargando) return <p>Cargando...</p>;

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

      {cargando ? (
        <p className="text-center">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h3 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-700 text-sm font-bold">
                  Nombre Colaborador: {""}
                  <span className="font-black">{colaborador.nombre}</span>
                </p>
                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() =>
                    agregarColaborador({ email: colaborador.email })
                  }
                >
                  Agregar al Proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
