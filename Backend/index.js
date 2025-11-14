import express from "express";
import { conectarDB } from "./db.js";
import medicosRouter from "./Routers/medicos.js";
import pacientesRouter from "./Routers/pacientes.js";
import turnosRouter from "./Routers/turnos.js";
import usuariosRouter from "./Routers/usuarios.js";
import authRouter, { authConfig } from "./Routers/auth.js";
import cors from "cors";


conectarDB();

const app = express();
const port = 3000;

app.use(express.json());

// Habilito CORS
app.use(cors());

authConfig();

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/medicos", medicosRouter);
app.use("/pacientes", pacientesRouter);
app.use("/turnos", turnosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`La aplicación esta funcionando en el puerto ${port}`);
});