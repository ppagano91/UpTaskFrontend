import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const [tokenValido, setTokenValido] = useState(false);

  const params = useParams();

  const { token } = params;

  const { msg } = alerta;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        // TODO: Mover hacia cliente Axios
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuarios/recuperar-password/${token}`;
        setTokenValido(true);

        const { data } = await axios.get(url);

        console.log(data);
      } catch (error) {
        setTokenValido(false);
        console.log(error.response);
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase block text-slate-700 font-bold text-xl"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded-xl border-gray-300 bg-gray-50 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="my-5">
            <label
              htmlFor="password2"
              className="uppercase block text-slate-700 font-bold text-xl"
            >
              Confirmar Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirmar Password"
              className="w-full mt-3 p-3 border rounded-xl border-gray-300 bg-gray-50 focus:outline-none focus:border-sky-500"
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className=" bg-sky-700 w-full mb-5 py-3 text-slate-50  uppercase rounded-full font-bold hover:bg-sky-800 hover:cursor-pointer transition-colors duration-300"
          />
        </form>
      )}
    </>
  );
};

export default NuevoPassword;
