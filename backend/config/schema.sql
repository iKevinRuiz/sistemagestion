-- structura table roles
CREATE TABLE roles (
    idRole INT AUTO_INCREMENT PRIMARY KEY,
    nomRole ENUM('admin', 'cliente') DEFAULT 'cliente', 
);

-- structure table usuario
CREATE TABLE usuarios (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    idRole INT,
    cedula VARCHAR (100) NOT NULL,
    nombre VARCHAR (100) NOT NULL, 
    apellido VARCHAR (100) NOT NULL,
    email VARCHAR (255) NOT NULL,
    pass VARCHAR (255) NOT NULL, 
    phone VARCHAR (15) NOT NULL,
    direccion VARCHAR (100) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    restToken VARCHAR (255) DEFAULT NULL,
    restTokenExpire DATETIME DEFAULT NULL,
    FOREIGN KEY (idRole) REFERENCES roles(idRole)
);
