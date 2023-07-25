import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  // Estados
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();

  const { token } = params;

  const { msg } = alerta;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/usuarios/recuperar-password/${token}`;
        await clienteAxios.get(url);
        setTokenValido(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que los dos passwords sean iguales
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los passwords no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/recuperar-password/${token}`;

      const { data } = await clienteAxios.post(url, {
        password,
      });

      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
    } catch (error) {
      console.log(error.response);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className=" bg-sky-700 w-full mb-5 py-3 text-slate-50  uppercase rounded-full font-bold hover:bg-sky-800 hover:cursor-pointer transition-colors duration-300"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          className="block text-center my-2 text-slate-500 uppercase text-sm"
          to={"/"}
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
