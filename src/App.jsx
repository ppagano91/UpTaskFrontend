import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import RecuperarPassword from "./pages/RecuperarPassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
