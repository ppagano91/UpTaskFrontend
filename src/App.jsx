import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

// Pages
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import RecuperarPassword from "./pages/RecuperarPassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Proyectos from "./pages/Proyectos";
import NuevoProyecto from "./pages/NuevoProyecto";
import Proyecto from "./pages/Proyecto";
import EditarProyecto from "./pages/EditarProyecto";
import NuevoColaborador from "./pages/NuevoColaborador";

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
              <Route
                path="nuevo-colaborador/:id"
                element={<NuevoColaborador />}
              />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
