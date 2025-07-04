-- Active: 1733797865142@@127.0.0.1@5432@blogdb
-- CREACION BASE DE DATOS BLOG
Create DATABASE BLOGDB;

-- TABLA PERSONA
CREATE TABLE PERSONA (
ID SERIAL PRIMARY KEY,
NOMBRE VARCHAR (100)  NOT NULL,
APELLIDO VARCHAR(100) NOT NULL,
SEXO CHAR (1) NOT NULL,
TELEFONO VARCHAR (10) NOT NULL,
CIUDAD VARCHAR (50) NOT NULL
)


-- TABLA USUARIO
CREATE TABLE USUARIO (
ID SERIAL PRIMARY KEY,
USERNAME VARCHAR (10) NOT NULL, 
CONTRASENA VARCHAR (100) NOT NULL,
FOREIGN KEY (ID) REFERENCES PERSONA (ID)
)


-- TABLA BLOG
CREATE TABLE BLOG (
IDBLOG SERIAL PRIMARY KEY,
ID SERIAL NOT NULL,
TITULO VARCHAR (150) NOT NULL,
DESCRIPCION VARCHAR (250) NOT NULL,
PORTADA VARCHAR (250) NOT NULL,
FECHACREACION DATE NOT NULL,
CONTENIDO VARCHAR (1000) NOT NULL,
FOREIGN KEY (ID) REFERENCES PERSONA (ID)
)

-- INSERSION DE TUPLAS
-- TABLA PERSONA
INSERT INTO PERSONA (NOMBRE, APELLIDO, SEXO, TELEFONO, CIUDAD) VALUES
('Ana', 'Gómez', 'F', '7654321010', 'La Paz'),
('Luis', 'Pérez', 'M', '7123456789', 'Santa Cruz'),
('María', 'Fernández', 'F', '7234567890', 'Cochabamba');

-- TABLA USUARIO - Contrasena: 123456
INSERT INTO USUARIO (ID, USERNAME, CONTRASENA) VALUES
(1, 'ana', '$2b$10$8.NcIYpa1UAgH7qkm/LnJedAjnchIRy8XszKOXI1kVql8yhby9jbu'),
(2, 'luisito', '$2b$10$8.NcIYpa1UAgH7qkm/LnJedAjnchIRy8XszKOXI1kVql8yhby9jbu'),
(3, 'maria', '$2b$10$8.NcIYpa1UAgH7qkm/LnJedAjnchIRy8XszKOXI1kVql8yhby9jbu');

-- TABLA BLOG
INSERT INTO BLOG (ID, TITULO, DESCRIPCION, PORTADA, FECHACREACION, CONTENIDO) VALUES
(1, 'Mi primer blog', 'Inicio mi aventura como bloguera', 'https://www.fmdos.cl/wp-content/uploads/2022/07/parque-aventura-2.jpg', '2025-07-01', 'Este es el primer blog de mi vida. ¡Gracias por leerme!'),
(2, 'Crónicas de viaje', 'Relato de mi experiencia en el Salar de Uyuni', 'https://www.lorenzoexpeditions.com/wp-content/uploads/2022/12/IMG_0557-1024x576.jpg', '2025-07-02', 'Viajar al Salar fue mágico. Aquí te cuento todos los detalles.'),
(3, 'Recetas fáciles', 'Ideas sencillas para cocinar en casa', 'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF_Y25_R13_W03_ES_ESCLCC32999-2_MAIN_F1_high-e94f7180.jpg', '2025-07-02', 'Hoy comparto 3 recetas rápidas y deliciosas.'),
(1, 'Tecnología y yo', 'Opinión sobre el impacto de la IA', 'https://www.santanderopenacademy.com/content/dam/becasmicrosites/01-soa-blog/ia-generativa-1.jpg', '2025-07-03', '¿Nos reemplazará la inteligencia artificial? Aquí mi análisis.'),
(2, 'Fútbol boliviano', 'Reflexión sobre la liga nacional', 'https://fifpro.org/media/kgihltzd/editada.jpg', '2025-07-03', 'Mi opinión sobre el rendimiento de los equipos en 2025.');

-- FUNCIONES Y PRODEDIMIENTOS ALMACENADOS
-- CREAR PERSONA
CREATE OR REPLACE FUNCTION fn_crear_persona(
    p_username VARCHAR(10),
    p_contrasena VARCHAR(100),
    p_nombre VARCHAR(100),
    p_apellido VARCHAR(100),
    p_sexo CHAR(1),
    p_telefono VARCHAR(10),
    p_ciudad VARCHAR(50)
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    p_id INTEGER;
BEGIN
    INSERT INTO persona (
        nombre, apellido, sexo, telefono, ciudad
    )
    VALUES (
        p_nombre, p_apellido, p_sexo, p_telefono, p_ciudad
    )
    RETURNING id INTO p_id;

    CALL pa_crear_usuario(p_id, p_username, p_contrasena);

    RETURN p_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al crear persona: %', SQLERRM;
END;
$$;

-- CREAR USUARIO
CREATE OR REPLACE PROCEDURE pa_crear_usuario(
    p_id INTEGER,
    p_username VARCHAR(10),
    p_contrasena VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN

    IF NOT EXISTS (SELECT 1 FROM persona WHERE id = p_id) THEN
        RAISE EXCEPTION 'No existe la persona: %', p_id;
    END IF;

    INSERT INTO usuario (
        id, username, contrasena
    )
    VALUES (
        p_id, p_username, p_contrasena
    );

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al crear usuario: %', SQLERRM;
END;
$$;

-- CREAR BLOG
CREATE OR REPLACE PROCEDURE pa_crear_blog(
    p_idpersona INTEGER,
    p_titulo VARCHAR(150),
    p_descripcion VARCHAR(250),
    p_portada VARCHAR(250),
    p_contenido VARCHAR(1000)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO blog (
        id, titulo, descripcion, portada, fechacreacion, contenido
    )
    VALUES (
        p_idpersona, p_titulo, p_descripcion, p_portada, NOW(), p_contenido
    );

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error al crear blog: %', SQLERRM;
END;
$$;
