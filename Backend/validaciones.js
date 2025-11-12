import { param, validationResult, body } from "express-validator";
import { db } from "./db.js"

export const validarId = param("id").isInt({ min: 1 });

