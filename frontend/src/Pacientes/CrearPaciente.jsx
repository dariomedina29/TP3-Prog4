import { useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router";

export const CrearUsuario = () => {
    const { fetchAuth } = useAuth();
    const navigate = useNavigate();
    const [errores, setErrores] = useState(null);

    const [values, setValues] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        fecha_nacimiento: "",
        obra_social: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores(null);

        const response = await fetchAuth("http://localhost:3000/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            if (response.status === 400) {
                return setErrores(data.errores);
            }
            return window.alert("Error al crear paciente");
        }
        navigate("/paciente");
    };


return (
    <article>
      <h2>Crear usuario</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Nombre
            <input
              required
              value={values.nombre}
              onChange={(e) =>
                setValues({ ...values, nombre: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "nombre")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "nombre")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Apellido
            <input
              required
              value={values.apellido}
              onChange={(e) => setValues({ ...values, apellido: e.target.value })}
              aria-invalid={
                errores && errores.some((e) => e.path === "apellido")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "apellido")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Dni
            <input
              required
              type="dni"
              value={values.dni}
              onChange={(e) =>
                setValues({ ...values, dni: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "dni")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "dni")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Fecha de Nacimiento
            <input
              required
              type="fecha_nacimiento"
              value={values.fecha_nacimiento}
              onChange={(e) =>
                setValues({ ...values, fecha_nacimiento: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "fecha_nacimiento")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "fecha_nacimiento")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Obra Social
            <input
              required
              type="obra_social"
              value={values.obra_social}
              onChange={(e) =>
                setValues({ ...values, obra_social: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "obra_social")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "obra_social")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
        </fieldset>
        <input type="submit" value="Crear Paciente" />
      </form>
    </article>
  );
};