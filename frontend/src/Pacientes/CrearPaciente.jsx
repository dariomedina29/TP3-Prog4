import { useState } from "react";
import { useAuth } from "../Auth";
import { useNavigate } from "react-router";

export const CrearPaciente = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    obra_social: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetchAuth("http://localhost:3000/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    let data;
    try {
      data = await response.json();
    } catch (err) {
      const text = await response.text();
      console.error("Respuesta no JSON del servidor:", text);
      return window.alert("Error inesperado del servidor");
    }

    if (!response.ok || !data.success) {
      console.error(data);
      return window.alert(data.message || "Error al crear paciente");
    }

    navigate("/pacientes");
  };

  return (
    <article>
      <h2>Nuevo Paciente</h2>
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
              onChange={(e) =>
                setValues({ ...values, apellido: e.target.value })
              }
            />
          </label>
          <label>
            DNI
            <input
              required
              value={values.dni}
              onChange={(e) =>
                setValues({ ...values, dni: e.target.value })
              }
            />
          </label>
          <label>
            Fecha de nacimiento
            <input
              type="date"
              required
              value={values.fecha_nacimiento}
              onChange={(e) =>
                setValues({ ...values, fecha_nacimiento: e.target.value })
              }
            />
          </label>
          <label>
            Obra social
            <input
              required
              value={values.obra_social}
              onChange={(e) =>
                setValues({ ...values, obra_social: e.target.value })
              }
            />
          </label>
        </fieldset>
        <input type="submit" value="Crear paciente" />
      </form>
    </article>
  );
};
