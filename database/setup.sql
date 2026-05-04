CREATE DATABASE IF NOT EXISTS rutaxruta;
USE rutaxruta;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('conductor', 'pasajero', 'ambos') DEFAULT 'pasajero',
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Vehículos (Solo para conductores)
CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50),
    color VARCHAR(30),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Rutas/Viajes
CREATE TABLE viajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conductor_id INT,
    origen VARCHAR(255),
    destino VARCHAR(255),
    lat_origen DECIMAL(10, 8),
    lon_origen DECIMAL(11, 8),
    lat_destino DECIMAL(10, 8),
    lon_destino DECIMAL(11, 8),
    hora_salida DATETIME,
    cupos_disponibles INT,
    precio DECIMAL(10, 2),
    FOREIGN KEY (conductor_id) REFERENCES usuarios(id)
);
