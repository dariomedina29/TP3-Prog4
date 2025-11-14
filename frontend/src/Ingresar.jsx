import { useState } from "react";
import { useAuth } from "./Auth";

export const Ingresar = () => {
  const { error, login } = useAuth();

  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, contraseña);

    if (!nombre.trim() || !contraseña) {
             setError("El nombre de usuario y la contraseña son obligatorios.");
            return;
        }

    }
 
    if (result.success) {
      setOpen(false);
    }
  

    return (
        <>
        <button onClick={() => setOpen(true)}>Ingresar</button>
        <dialog open={open}>
            <article>
            <h2>Ingrese nombre y contraseña</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <label htmlFor="nombre">Usuario:</label>
                <input
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="contraseña">Contraseña:</label>
                <input
                    name="contraseña"
                    type="contraseña"
                    value={password}
                    onChange={(e) => setContraseña(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                </fieldset>
                <footer>
                <div className="grid">
                    <input
                    type="button"
                    className="secondary"
                    value="Cancelar"
                    onClick={() => setOpen(false)}
                    />
                    <input type="submit" value="Ingresar" />
                </div>
                </footer>
            </form>
            </article>
        </dialog>
        </>
    );
};