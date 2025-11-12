import express from "express";
import { conectarDB } from "./db.js";
import cors from "cors";


conectarDB();

const app = express();
const port = 3000;

app.use(express.json());

// Habilito CORS
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.listen(port, () => {
    console.log(`La aplicación esta funcionando en el puerto ${port}`);
});