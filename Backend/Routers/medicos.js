import express from "express";
import {db} from "../db.js";
import {body, query} from "express-validator";
import {validarId, verificarValidaciones, validarMedico} from "../validaciones.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const {nombre, apellido, especialidad, matricula_profesional} = req.query;

    let sql = "SELECT * FROM medicos";

    const [rows] = await db.execute(sql);
    res.json({success: true, data: rows});
});

router.get("/:id", validarId, verificarValidaciones, async (req,res)=>{
    const {id} = req.params;

    const [rows] = await db.execute("SELECT * FROM medicos WHERE id = ?", [id]);

    if (rows.length === 0){
        return res.status(404).json({success: false, message: "Medico no encontrado"});
    }

    res.json({success: true, data: rows[0]});
});

router.post("/", validarMedico, verificarValidaciones, async(req,res)=>{
    const {nombre, apellido, especialidad, matricula_profesional} = req.body;

    const [result] = await db.execute("INSERT INTO medicos (nombre, apellido, especialidad, matricula_profesional) VALUES (?,?,?,?)",[nombre, apellido, especialidad, matricula_profesional]);

    res.status(201).json({success: true, data: {id: result.insertId, nombre, apellido, especialidad, matricula_profesional},});
});

router.put("/:id", validarId, validarMedico, verificarValidaciones, async(req, res)=>{
    const id = Number(req.params.id);
    const {nombre, apellido, especialidad, matricula_profesional} = req.body;

    await db.execute("UPDATE medicos SET nombre=?, apellido=?, especialidad=?, matricula_profesional=? WHERE id=?", [nombre, apellido, especialidad, matricula_profesional, id]);

    res.status(201).json({success: true, data: {id, nombre, apellido, especialidad, matricula_profesional},});
});

router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
    const id = Number(req.params.id);

    try {
        const [result] = await db.execute(
            "DELETE FROM medicos WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Médico no encontrado" });
        }

        res.json({ success: true, data: id });
    } catch (error) {
        console.error("Error al eliminar médico:", error);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(400).json({
                success: false,
                message:
                    "No se puede eliminar el médico porque tiene turnos asociados",
            });
        }

        res.status(500).json({
            success: false,
            message: "Error interno al eliminar médico",
        });
    }
});

export default router;