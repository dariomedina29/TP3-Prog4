import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@picocss/pico";
import './index.css'
import { Layout } from "./Layout.jsx";
import { Home } from "./Home.jsx";
import { AuthProvider, AuthPage } from './Auth.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Usuarios } from './Usuarios/Usuarios.jsx'
import { DetallesUsuario } from "./Usuarios/DetallesUsuario.jsx";
import { CrearUsuario } from "./Usuarios/CrearUsuario.jsx";
import { ModificarUsuario} from "./Usuarios/ModificarUsuarios.jsx";
import { CrearPaciente } from "./Pacientes/CrearPaciente.jsx";
import { DetallesPaciente } from "./Pacientes/DetallesPaciente.jsx";
import { ModificarPaciente } from "./Pacientes/ModificarPaciente.jsx";
import { Pacientes } from "./Pacientes/Pacientes.jsx";
import { Medicos } from "./Medicos/Medicos.jsx"
import { CrearMedico } from "./Medicos/CrearMedico.jsx"
import { DetallesMedico } from "./Medicos/DetallesMedico.jsx"
import { ModificarMedico } from "./Medicos/ModificarMedico.jsx"



createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="usuarios"
              element={
                <AuthPage>
                  <Usuarios />
                </AuthPage>
              }
            />
            <Route
              path="usuarios/:id"
              element={
                <AuthPage>
                  <DetallesUsuario />
                </AuthPage>
              }
            />
            <Route
              path="usuarios/:id/modificar"
              element={
                <AuthPage>
                  <ModificarUsuario />
                </AuthPage>
              }
            />
            <Route
              path="usuarios/crear"
              element={
                <AuthPage>
                  <CrearUsuario />
                </AuthPage>
              }
            />


            <Route
              path="pacientes"
              element={
                <AuthPage>
                  <Pacientes />
                </AuthPage>
              }
            />

            <Route
              path="pacientes/crear"
              element={
                <AuthPage>
                  <CrearPaciente />
                </AuthPage>
              }
            />

            <Route
              path="pacientes/:id/modificar"
              element={
                <AuthPage>
                  <ModificarPaciente />
                </AuthPage>
              }
            />

            <Route
              path="pacientes/:id"
              element={
                <AuthPage>
                  <DetallesPaciente />
                </AuthPage>
              }
            />


            <Route
              path="medicos"
              element={
                <AuthPage>
                  <Medicos />
                </AuthPage>
              }
            />

            <Route
              path="medicos/:id"
              element={
                <AuthPage>
                  <DetallesMedico />
                </AuthPage>
              }
            />

            <Route
              path="medicos/crear"
              element={
                <AuthPage>
                  <CrearMedico />
                </AuthPage>
              }
            />

            <Route
              path="medicos/editar/:id"
              element={
                <AuthPage>
                  <ModificarMedico />
                </AuthPage>
              }
            />
          </Route>
        </Routes >
      </BrowserRouter >
    </AuthProvider >
  </StrictMode >
)
