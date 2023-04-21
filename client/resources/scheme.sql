CREATE TABLE ESTUDIANTE (
	expediente INTEGER PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50),
    nombre_completo VARCHAR(150) NOT NULL,
    semestre INTEGER NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(150) NOT NULL,
    genero VARCHAR(10) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    direccion VARCHAR(150) NOT NULL
);