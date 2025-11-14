import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useNavigate } from "react-router";

export const CrearTurno = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    paciente_id: "",
    medico_id: "",
    fecha: "",
    hora: "",
    estado: "pendiente",
    observaciones: "",
  });
   
   const [pacientes, setPacientes] = useState([]);
   const [medicos, setMedicos] = useState([]);
   const [errores, setErrores] = useState(null);

   const DatosPM = useCallback(async () => {
        const responsePacientes = await fetchAuth("http://localhost:3000/pacientes");
        const dataP = await response.json();

        if (!responsePacientes.ok || !dataP.success) {
            console.log("Error al cargar pacientes");
            return;
        }
        setPacientes(dataP.data);

        const responseMedicos = await fetchAuth("http://localhost:3000/medicos");
        const dataM = await response.json();

        if (!responseMedicos.ok || !dataM.success) {
            console.log("Error al cargar medicos");
            return;
        }
        setMedicos(dataM.data);
        DatosPM();
    }, [fetchAuth]);

    useEffect(() => {
        responsePacientes();
        responseMedicos();
    }, [responsePacientes, responseMedicos]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchAuth("http://localhost:3000/turnos", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error(data);
      return window.alert("Error al crear turno");
    }

    navigate("/turnos");
  };

  return (
    <article>
      <h2>Nuevo Turno</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Paciente
            <select
              required
              value={values.paciente_id}
              onChange={(e) =>
                setValues({ ...values, paciente_id: e.target.value })
              }
            >
              <option value="">Seleccione un paciente</option>
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
          </label>

          <label>
            Medico
            <select
              required
              value={values.medico_id}
              onChange={(e) =>
                setValues({ ...values, medico_id: e.target.value })
              }
            >
              <option value="">Seleccione un medico</option>
              {medicos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} {m.apellido} - {m.especialidad}
                </option>
              ))}
            </select>
          </label>

          <label>
            Fecha
            <input
              type="date"
              required
              value={values.fecha}
              onChange={(e) => setValues({ ...values, fecha: e.target.value })}
            />
          </label>

          <label>
            Hora
            <input
              type="time"
              required
              value={values.hora}
              onChange={(e) => setValues({ ...values, hora: e.target.value })}
            />
          </label>

          <label>
            Estado
            <select
              value={values.estado}
              onChange={(e) => setValues({ ...values, estado: e.target.value })}
            >
              <option value="pendiente">Pendiente</option>
              <option value="atendido">Atendido</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </label>

          <label>
            Observaciones
            <textarea
              value={values.observaciones}
              onChange={(e) =>
                setValues({ ...values, observaciones: e.target.value })
              }
            />
          </label>
        </fieldset>
        <input type="submit" value="Nuevo Turno" />
      </form>
    </article>
  );

    







}

