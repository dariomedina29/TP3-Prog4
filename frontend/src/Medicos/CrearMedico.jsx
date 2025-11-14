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
        especialidad: "",
        matricula_profesional: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrores(null);

        const response = await fetchAuth("http://localhost:3000/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            if (response.status === 400) {
                return setErrores(data.errores);
            }
            return window.alert("Error al crear medicos");
        }
        navigate("/medicos");
    };


return (
    <article>
      <h2>Crear medico</h2>
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
            Especialidad
            <input
              required
              type="especialidad"
              value={values.especialidad}
              onChange={(e) =>
                setValues({ ...values, especialidad: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "especialidad")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "especialidad")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
          <label>
            Matricula Profesional
            <input
              required
              type="matricula_profesional"
              value={values.matricula_profesional}
              onChange={(e) =>
                setValues({ ...values, matricula_profesional: e.target.value })
              }
              aria-invalid={
                errores && errores.some((e) => e.path === "matricula_profesional")
              }
            />
            {errores && (
              <small>
                {errores
                  .filter((e) => e.path === "matricula_profesional")
                  .map((e) => e.msg)
                  .join(", ")}
              </small>
            )}
          </label>
        </fieldset>
        <input type="submit" value="Crear Medico" />
      </form>
    </article>
  );
};