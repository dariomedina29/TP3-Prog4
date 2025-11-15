import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { Link } from "react-router";

export function Pacientes() {
    const { fetchAuth } = useAuth();
    const [pacientes, setPacientes] = useState([]);


    useEffect(() => {
        const fetchPacientes = async () => {
            const response = await fetchAuth("http://localhost:3000/pacientes")
            const data = await response.json();
            if (!response.ok) {
                console.log("Error:", data.error);
                return;
            }

            setPacientes(data.data);
        }

        fetchPacientes();
    }, [fetchAuth]);

    const handleQuitar = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este paciente?")) return;

        const response = await fetchAuth(`http://localhost:3000/pacientes/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.log("Error al eliminar:", data.message || data.error);
            return;
        }

        setPacientes(pacientes.filter((p) => p.id !== id));
    };

    return (
            <article>
                <h2>pacientes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Dni</th>
                            <th>Obra Social</th>
                            <th>Acciones</th>
                            </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((p) => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.dni}</td>
                                <td>{p.obra_social}</td>
                                <td><Link to={`/pacientes/${p.id}/modificar`} role="button" className="secondary">Modificar</Link></td>
                                <td><Link to={`/pacientes/${p.id}`} role="button" className="secondary">Ver</Link></td>
                                <td>
                                    <button
                                    onClick={() => handleQuitar(p.id)}
                                    className="secondary"
                                >
                                    Quitar
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/pacientes/crear" role="button">Nuevo Paciente</Link>
            </article>
        );
}