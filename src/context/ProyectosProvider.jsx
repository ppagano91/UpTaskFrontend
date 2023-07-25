import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  return (
    <ProyectosContext.Provider value={{}}>{children}</ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
