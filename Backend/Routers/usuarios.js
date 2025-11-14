import express from "express";
import {db} from "../db.js";
import { validarId, verificarValidaciones, validarUsuario } from "../validaciones.js";
import {body, param} from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";

const router = express.Router();

router.get("/",  passport.authenticate("jwt", { session: false }),
    async (req, res) => {

        const [rows] = await db.execute("SELECT * FROM usuarios");
        res.json({
            success: true,
            usuarios: rows.map((u) => ({ ...u, contraseña: undefined })),
        });
    }
);

router.get("/:id", validarId, verificarValidaciones, async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await db.execute(
        "SELECT id, nombre, email FROM usuarios WHERE id=?",
        [id]
    );

    if (rows.length === 0) {
        return res
            .status(404)
            .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({ success: true, data: rows[0] });
});

router.post(
    "/",
    validarUsuario, verificarValidaciones, async (req, res) => {
        const { nombre, contraseña, email } = req.body;

        const hashedPassword = await bcrypt.hash(contraseña, 12);

        const [result] = await db.execute(
            "INSERT INTO usuarios (nombre, contraseña, email) VALUES (?,?,?)",
            [nombre, hashedPassword, email]
        );

        res.status(201).json({
            success: true,
            data: { id: result.insertId, nombre, email },
        });
    }
);

router.put("/:id", validarId, verificarValidaciones, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {nombre, email, contraseña} = req.body;

        let sql;
        let params;

        if (password) {
                const hashedPassword = await bcrypt.hash(contraseña, 12);
                sql = "UPDATE usuarios SET nombre = ?, email = ?, contraseña = ? WHERE id = ?";
                params = [nombre, email, hashedPassword, id];
            } else {
                sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?";
                params = [nombre, email, id];
            }

            const [result] = await db.execute(sql, params);

            if (result.affectedRows === 0) {
                return res.status(404).json({success: false, message: "Usuario no encontrado",});
            }

            res.json({success: true, message: "Usuario actualizado correctamente",});

        } catch (error) {
            console.error(error);
            res.status(500).json({success: false, message: "Error al actualizar el usuario",});
        }
    }
);

router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
        try {
            const id = Number(req.params.id);

            const [result] = await db.execute("DELETE FROM usuarios WHERE id = ?",[id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({success: false, message: "Usuario no encontrado",});
            }

            res.json({success: true, message: "Usuario eliminado correctamente",});

        } catch (error) {console.error(error);
                res.status(500).json({success: false,message: "Error al eliminar el usuario",});
        }
    }
);


export default router;