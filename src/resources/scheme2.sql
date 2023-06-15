CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(500) NOT NULL,
    role VARCHAR(15) NOT NULL,
    address VARCHAR(100)
);

CREATE TABLE Product (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    store_name VARCHAR(100) NOT NULL,
    store_address VARCHAR(100) NOT NULL
);

CREATE TABLE Visitor (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    record_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(50),
    birthdate DATE NOT NULL,
    age INTEGER NOT NULL,
    birth_state VARCHAR(50) NOT NULL
);