import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Hay token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ setAuth }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
