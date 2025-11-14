--Tabla Medicos--
CREATE TABLE `medicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  `matricula_profesional` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matricula_profesional_UNIQUE` (`matricula_profesional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Tabla Pacientes--
CREATE TABLE `pacientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `obra_social` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Tabla Turnos--
CREATE TABLE `turnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paciente_id` int NOT NULL,
  `medico_id` int NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` varchar(15) NOT NULL,
  `observaciones` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_turnos_medicos_idx` (`medico_id`),
  KEY `fk_turnos_pacientes_idx` (`paciente_id`),
  CONSTRAINT `fk_turnos_medicos` FOREIGN KEY (`medico_id`) REFERENCES `medicos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_turnos_pacientes` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--Tabla Usuarios--
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
