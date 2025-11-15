import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useParams } from "react-router";

export const DetallesPaciente = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);

  const fetchPaciente = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/pacientes/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por paciente:", data.error);
      return;
    }
    setPaciente(data.paciente);
  }, [fetchAuth, id]);

   useEffect(() => {
    fetchPaciente();
   }, [fetchPaciente]);

   if (!paciente) {
    return null;
  }

  return (
    <article>
      <h2>Detalles de paciente</h2>
      <p>
        Nombre: <b>{paciente.nombre}</b>
      </p>
      <p>
        Apellido: <b>{paciente.email}</b>
      </p>
      <p>
        Dni: <b>{paciente.dni}</b>
      </p>
      <p>
        Fecha de Nacimiento: <b>{paciente.fecha_nacimiento}</b>
      </p>
      <p>
        Obra Social: <b>{paciente.obra_social}</b>
      </p>
    </article>
  );
}