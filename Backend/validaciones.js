import { param, validationResult, body } from "express-validator";
import { db } from "./db.js"

export const validarId = param("id").isInt({ min: 1 });

export const validarMedico = [
    body("nombre")
    .isString().withMessage("El nombre debe ser una cadena de texto")
    .not().isNumeric().withMessage("Ingresar solo letras")
    .notEmpty().withMessage("Es obligatorio el nombre")
    .isLength({ min:4, max: 50 }).withMessage("El nombre debe tener entre 4 y 50 caracteres"),

    body("apellido")
    .isString().withMessage("El apellido debe ser una cadena de texto")
    .not().isNumeric().withMessage("Ingresar solo letras")
    .notEmpty().withMessage("Es obligatorio el apellido")
    .isLength({ min:4, max: 50 }).withMessage("El nombre debe tener entre 4 y 50 caracteres"),

    body("especialidad")
    .isString().withMessage("El apellido debe ser una cadena de texto")
    .not().isNumeric().withMessage("Ingresar solo letras")
    .notEmpty().withMessage("Es obligatorio el apellido")
    .isLength({ min:4, max: 50 }).withMessage("El nombre debe tener entre 4 y 50 caracteres"),

    body("matricula_profesional")
    .notEmpty().withMessage("Matricula es obligatorio")
    .isLength({ min:9, max: 11 }).withMessage("La matricula debe tener entre 9 y 10 caracteres")
    .custom(async (value, {req})=>{
        const [exist] = await db.execute(
            "SELECT * FROM medicos WHERE matricula_profesional = ?",
            [value]
        );

        if (exist.length > 0 && exist[0].id !== Number(req.params.id)){
            throw new Error("Ya existe esa matricula");
        }
        
        return true;
    })
];

export const validarPaciente = [
    body("nombre")
    .isString().withMessage("El nombre debe ser una cadena de texto")
    .not().isNumeric().withMessage("Ingresar solo letras")
    .notEmpty().withMessage("Es obligatorio el nombre")
    .isLength({ min:4, max: 50 }).withMessage("El nombre debe tener entre 4 y 50 caracteres"),

    body("apellido")
    .isString().withMessage("El apellido debe ser una cadena de texto")
    .not().isNumeric().withMessage("Ingresar solo letras")
    .notEmpty().withMessage("Es obligatorio el apellido")
    .isLength({ min:4, max: 50 }).withMessage("El nombre debe tener entre 4 y 50 caracteres"),

    body("dni")
    .trim()
    .notEmpty().withMessage("Dni es obligatorio")
    .isNumeric().withMessage("Ingresar solo numeros")
    .isLength({ min: 7, max: 9 }).withMessage("El Dni debe tener entre 7 y 8 digitos")
    .custom(async (value, { req }) => {
        const [exist] = await db.execute(
            "SELECT * FROM pacientes WHERE dni = ?",
            [value]
        );

        if (exist.length > 0 && Number(exist[0].id) !== Number(req.params.id)) {
            throw new Error("Ya existe otro paciente con este DNI.");
        }

        return true;
    }),

    body("fecha_nacimiento")
            .notEmpty().withMessage("Es obligatoria la fecha de nacimiento")
            .isISO8601().withMessage("Debe tener un formato válido (YYYY-MM-DD)")
            .custom((value) => {
                const fecha = new Date(value);
                const hoy = new Date();
                const edad = hoy.getFullYear() - fecha.getFullYear();
                if (fecha > hoy) {
                    throw new Error("La fecha de nacimiento no puede ser futura.");
                }
                if (edad < 7) {
                    throw new Error("Debe tener al menos 7 años.");
                }
                if (edad > 120) {
                    throw new Error("La edad ingresada no es válida.");
                }
                return true;
            }),

    body("obra_social")
        .isString().withMessage("La obra social debe ser una cadena de texto")
        .not().isNumeric().withMessage("Solo letras")
        .notEmpty().withMessage("Campo obligatorio")
        .isLength({ min: 4, max: 45 }).withMessage("La obra social debe tener entre 2 y 50 caracteres"),
];

export const validarTurnos = [
    body("paciente_id")
        .isInt({ min: 1 }).withMessage("Ingresar un numero entero positivo")
        .custom(async (value) => {
            const [rows] = await db.execute("SELECT * FROM pacientes WHERE id = ?", [value]);
            if (rows.length === 0) {
                throw new Error("El paciente no existe");
            }
            return true;
        }),
    body("medico_id")
        .isInt({ min: 1 }).withMessage("Ingresar un numero entero positivo")
        .custom(async (value) => {
            const [rows] = await db.execute("SELECT * FROM medicos WHERE id = ?", [value]);
            if (rows.length === 0) {
                throw new Error("El médico no existe");
            }
            return true;
        }),
    body("fecha")
        .notEmpty().withMessage("La fecha es obligatoria")
        .isISO8601().withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)")
        .custom((value) => {
            const fechaTurno = new Date(value);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            if (fechaTurno < hoy) {
                throw new Error("La fecha del turno no puede ser en el pasado");
            }
            return true;
        }),
    body("hora")
        .notEmpty().withMessage("La hora es obligatoria")
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("La hora debe tener un formato válido (HH:MM)")
        .custom(async (value, { req }) => {
            const { medico_id, fecha } = req.body;

            if (!medico_id || !fecha) return true;

            const [existe] = await db.execute(
                "SELECT * FROM turnos WHERE medico_id = ? AND fecha = ? AND hora = ?",
                [medico_id, fecha, value]
            );

            if (existe.length > 0) {
                throw new Error("El médico ya tiene un turno en ese horario");
            }

            return true;
        }),
    body("estado")
        .isString().withMessage("El estado debe ser una cadena de texto")
        .isIn(['pendiente', 'atendido', 'cancelado']).withMessage("El estado debe ser: 'pendiente', 'atendido' o 'cancelado'"),
    body("observaciones")
        .isString().withMessage("Las observaciones deben ser una cadena de texto")
        .isLength({ max: 100 }).withMessage("Coloca un texto de 100 caracteres como máximo")
];

export const validarUsuario = [
    body("nombre")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio.")
        .isLength({ max: 45 }).withMessage("El nombre debe tener menos de 45 caracteres."),
    body("email")
        .trim()
        .notEmpty().withMessage("El email es obligatorio.")
        .isEmail().withMessage("Debe ser un email válido."),
    body("contraseña")
        .notEmpty().withMessage("La contraseña es obligatoria.")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })

];

export const validarAuth = [
    body("nombre").isAlphanumeric("es-ES").isLength({ max: 20 }),
    body("contraseña").isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        }).withMessage("La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero.")

]

export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Falla de validacion",
      errores: validacion.array(),
    });
  }
  next();
};