import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { Link } from "react-router";

export function pacientes() {
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

            setPacientes(data.pacientes);
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

        setPacientes(pacientes.filter((u) => u.id !== id));
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
                        {pacientes.map((u) => (
                            <tr key={u.id}>
                                <td>{u.nombre}</td>
                                <td>{u.apellido}</td>
                                <td>{u.dni}</td>
                                <td>{u.obra_social}</td>
                                <td><Link to={`/pacientes/${u.id}/modificar`} role="button" className="secondary">Modificar</Link></td>
                                <td><Link to={`/pacientes/${u.id}`} role="button" className="secondary">Ver</Link></td>
                                <button
                                    onClick={() => handleQuitar(u.id)}
                                    className="secondary"
                                >
                                    Quitar
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/pacientes/crear" role="button">Nuevo Paciente</Link>
            </article>
        );
}