import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Hay token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
