import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarUsuario = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);

  const fetchPaciente = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/pacientes/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por paciente:", data.error);
      return;
    }
    setValues(data.usuario);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchPaciente();
  }, [fetchPaciente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    const response = await fetchAuth(`http://localhost:3000/pacientes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return window.alert("Error al modificar paciente");
    }

    navigate("/pacientes");
  };

  if (!values) {
    return null;
  }

  return (
    <article>
      <h2>Modificar paciente</h2>
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
            />
          </label>
          <label>
            Apellido
            <input
              required
              value={values.apellido}
              onChange={(e) => setValues({ ...values, apellido: e.target.value })}
            />
          </label>
          <label>
            Dni
            <input
              required
              value={values.dni}
              onChange={(e) =>
                setValues({ ...values, dni: e.target.value })
              }
            />
          </label>
          <label>
            Fecha de Nacimiento
            <input
              required
              value={values.fecha_nacimiento}
              onChange={(e) =>
                setValues({ ...values, fecha_nacimiento: e.target.value })
              }
            />
          </label>
          <label>
            Obra Social
            <input
              required
              value={values.obra_social}
              onChange={(e) =>
                setValues({ ...values, obra_social: e.target.value })
              }
            />
          </label>
        </fieldset>
        <input type="submit" value="Modificar Paciente" />
      </form>
    </article>
  );
};