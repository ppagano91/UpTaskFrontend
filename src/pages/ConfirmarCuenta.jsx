import React from "react";

const ConfirmarCuenta = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700 capitalize">proyectos</span>
      </h1>
      <input
        type="button"
        value="Confirmar Cuenta"
        className=" bg-sky-700 w-full mb-5 py-3 text-slate-50  uppercase rounded-full font-bold hover:bg-sky-800 hover:cursor-pointer transition-colors duration-300"
      />
    </>
  );
};

export default ConfirmarCuenta;
