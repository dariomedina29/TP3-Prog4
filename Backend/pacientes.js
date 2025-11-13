import express from "express";
import {db} from "./db.js";
import {body, query} from "express-validator";
import {validarId, verificarValidacion, validarPaciente} from "./validaciones.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const {nombre, apellido, dni, fecha_nacimiento, obra_social} = req.query;

    let sql = "SELECT * FROM pacientes";

    const [rows] = await db.execute(sql);
    res.json({success: true, data: rows});
});

router.get(":id", validarId, verificarValidacion, async (req,res)=>{
    const {id} = req.params;

    const [rows] = await db.execute("SELECT * FROM pacientes WHERE id = ?", [id]);

    if (rows.length === 0){
        return res.status(404).json({success: false, message: "Medico no encontrado"});
    }

    res.json({success: true, data: rows[0]});
});

router.post("/", validarPaciente, verificarValidacion, async(req,res)=>{
    const {nombre, apellido, dni, fecha_nacimiento, obra_social} = req.query;

    const [result] = await db.execute("INSERT INTO pacientes (nombre, apellido, dni, fecha_nacimiento, obra_social) VALUES (?,?,?,?)",[nombre, apellido, dni, fecha_nacimiento, obra_social]);

    res.status(201).json({success: true, data: {id: result.insertId, nombre, apellido, dni, fecha_nacimiento, obra_social},});
});

router.put("/:id", validarId, validarPaciente, verificarValidacion, async(req, res)=>{
    const id = Number(req.params.id);
    const {nombre, apellido, dni, fecha_nacimiento, obra_social} = req.body;

    await db.execute("UPDATE pacientes SET nombre=?, apellido=?, dni=?, fecha_nacimiento, obra_social=? WHERE id=?", [nombre, apellido, dni, fecha_nacimiento, obra_social, id]);

    res.status(201).json({success: true, data: {id, nombre, apellido, dni, fecha_nacimiento, obra_social},});
});

router.delete("/:id", validarId, validarPaciente, verificarValidacion, async(req, res)=>{
    const id = Number(req.params.id);

    await db.execute("DELETE FROM pacientes WHERE id=?", [id]);
    res.json({success: true, data: id});
});

export default router;