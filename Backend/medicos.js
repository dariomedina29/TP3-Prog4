import express from "express";
import {db} from "./db.js";
import {body, query} from "express-validator";
import {validarId, verificarValidacion, validarMedico} from "./validaciones.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const {nombre, apellido, especialidad, matricula} = req.query;

    let sql = "SELECT * FROM medicos";

    const [rows] = await db.execute(sql);
    res.json({success: true, data: rows});
});

router.get(":id", validarId, verificarValidacion, async (req,res)=>{
    const {id} = req.params;

    const [rows] = await db.execute("SELECT * FROM medicos WHERE id = ?", [id]);

    if (rows.length === 0){
        return res.status(404).json({success: false, message: "Medico no encontrado"});
    }

    res.json({success: true, data: rows[0]});
});

router.post("/", validarMedico, verificarValidacion, async(req,res)=>{
    const {nombre, apellido, especialidad, matricula} = req.query;

    const [result] = await db.execute("INSERT INTO medicos (nombre, apellido, especialidad, matricula) VALUES (?,?,?,?)",[nombre, apellido, especialidad, matricula]);

    res.status(201).json({success: true, data: {id: result.insertId, nombre, apellido, especialidad, matricula},});
});

router.put("/:id", validarId, validarMedico, verificarValidacion, async(req, res)=>{
    const id = Number(req.params.id);
    const {nombre, apellido, especialidad, matricula} = req.body;

    await db.execute("UPDATE medicos SET nombre=?, apellido=?, especialidad=?, matricula=? WHERE id=?", [nombre, apellido, especialidad, matricula, id]);

    res.status(201).json({success: true, data: {id, nombre, apellido, especialidad, matricula},});
});

router.delete("/:id", validarId, validarMedico, verificarValidacion, async(req, res)=>{
    const id = Number(req.params.id);

    await db.execute("DELETE FROM medicos WHERE id=?", [id]);
    res.json({success: true, data: id});
});

export default router;