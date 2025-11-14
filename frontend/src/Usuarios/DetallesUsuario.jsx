import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useParams } from "react-router";

export const DetallesUsuario = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  const fetchUsuario = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/usuarios/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por usuario:", data.error);
      return;
    }
    setUsuario(data.usuario);
  }, [fetchAuth, id]);

   useEffect(() => {
    fetchUsuario();
   }, [fetchUsuario]);

   if (!usuario) {
    return null;
  }

  return (
    <article>
      <h2>Detalles de usuario</h2>
      <p>
        Nombre: <b>{usuario.nombre}</b>
      </p>
      <p>
        Email: <b>{usuario.email}</b>
      </p>
    </article>
  );
}