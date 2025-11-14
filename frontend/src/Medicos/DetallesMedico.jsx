import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useParams } from "react-router";

export const DetallesUsuario = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const [medico, setMedico] = useState(null);

  const fetchMedico = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/medicos/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por paciente:", data.error);
      return;
    }
    setMedico(data.medico);
  }, [fetchAuth, id]);

   useEffect(() => {
    fetchMedico();
   }, [fetchMedico]);

   if (!medico) {
    return null;
  }

  return (
    <article>
      <h2>Detalles de medico</h2>
      <p>
        Nombre: <b>{medico.nombre}</b>
      </p>
      <p>
        Apellido: <b>{medico.apellido}</b>
      </p>
      <p>
        Especialidad: <b>{medico.especialidad}</b>
      </p>
      <p>
        Matricula Profesional: <b>{medico.matricula_profesional}</b>
      </p>
    </article>
  );
}