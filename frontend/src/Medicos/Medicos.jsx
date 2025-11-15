import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { Link } from "react-router";

export function Medicos() {
    const { fetchAuth } = useAuth();
    const [medicos, setMedicos] = useState([]);


    useEffect(() => {
        const fetchMedicos = async () => {
            const response = await fetchAuth("http://localhost:3000/medicos")
            const data = await response.json();
            if (!response.ok) {
                console.log("Error:", data.error);
                return;
            }

            setMedicos(data.data);
        }

        fetchMedicos();
    }, [fetchAuth]);

    const handleQuitar = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este medico?")) return;

        const response = await fetchAuth(`http://localhost:3000/medicos/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.log("Error al eliminar:", data.message || data.error);
            return;
        }

        setMedicos(medicos.filter((m) => m.id !== id));
    };

    return (
            <article>
                <h2>medicos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Matricula Profesional</th>
                            <th>Acciones</th>
                            </tr>
                    </thead>
                    <tbody>
                        {medicos.map((m) => (
                            <tr key={m.id}>
                                <td>{m.nombre}</td>
                                <td>{m.apellido}</td>
                                <td>{m.especialidad}</td>
                                <td>{m.matricula_profesional}</td>
                                <td><Link to={`/medicos/${m.id}/modificar`} role="button" className="secondary">Modificar</Link></td>
                                <td><Link to={`/medicos/${m.id}`} role="button" className="secondary">Ver</Link></td>
                                <td>
                                    <button
                                    onClick={() => handleQuitar(m.id)}
                                    className="secondary"
                                >
                                    Quitar
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/pacientes/crear" role="button">Nuevo Medico</Link>
            </article>
        );
}