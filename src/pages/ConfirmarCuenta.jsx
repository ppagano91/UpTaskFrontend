import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // Obtener el token (id) de la URL
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuarios/confirmar/${id}`;

        const { data } = await axios.get(url);

        console.log(data);
        setAlerta({
          msg: data.msg,
          error: false,
        });

        setCuentaConfirmada(true);
      } catch (error) {
        console.log(error);
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, []);

  const { msg, error } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            className="block text-center my-2 text-slate-500 uppercase text-sm"
            to={"/"}
          >
            Inicia Sesión
          </Link>
        )}
      </div>
      {/* <input
        type="button"
        value="Confirmar Cuenta"
        className=" bg-sky-700 w-full mb-5 py-3 text-slate-50  uppercase rounded-full font-bold hover:bg-sky-800 hover:cursor-pointer transition-colors duration-300"
      /> */}
    </>
  );
};

export default ConfirmarCuenta;
