import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarUsuario = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState(null);
  const [errores, setErrores] = useState(null);

  const fetchUsuario = useCallback(async () => {
    try {
      const response = await fetchAuth(`http://localhost:3000/usuarios/${id}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        console.log("Error al consultar usuario:", data.error || data.message);
        return;
      }

      setValues(data.data);
    } catch (err) {
      console.error("Error cargando usuario:", err);
    }
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchUsuario();
  }, [fetchUsuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores(null);

    try {
      const response = await fetchAuth(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(data);
        if (response.status === 400 && data.errores) {
          setErrores(data.errores);
        } else {
          window.alert("Error al modificar usuario");
        }
        return;
      }

      navigate("/usuarios");
    } catch (err) {
      console.error("Error al modificar usuario:", err);
      window.alert("Error inesperado al modificar usuario");
    }
  };

  if (!values) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <article>
      <h2>Modificar usuario</h2>

      {errores && (
        <ul style={{ color: "red" }}>
          {errores.map((err, i) => (
            <li key={i}>{err.msg || err}</li>
          ))}
        </ul>
      )}

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
            Email
            <input
              type="email"
              required
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
            />
          </label>

          <label>
            Contraseña
            <input
              required
              value={values.contraseña}
              onChange={(e) => setValues({ ...values, contraseña: e.target.value })}
            />
          </label>
        </fieldset>

        <input type="submit" value="Modificar usuario" />
      </form>
    </article>
  );
};
