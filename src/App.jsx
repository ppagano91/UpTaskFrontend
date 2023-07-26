import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import RecuperarPassword from "./pages/RecuperarPassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Proyectos from "./pages/Proyectos";
import RutaProtegida from "./layouts/RutaProtegida";
import NuevoProyecto from "./pages/NuevoProyecto";
import Proyecto from "./pages/Proyecto";

// Context
import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route index path="registrar" element={<Registrar />} />
              <Route
                index
                path="recuperar-password"
                element={<RecuperarPassword />}
              />
              <Route
                index
                path="recuperar-password/:token"
                element={<NuevoPassword />}
              />
              <Route index path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path=":id" element={<Proyecto />} />
            </Route>

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
