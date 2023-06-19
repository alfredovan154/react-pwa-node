CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(500) NOT NULL,
    temporary_pass VARCHAR(100),
    role VARCHAR(15) NOT NULL,
    address VARCHAR(100)
);

CREATE TABLE Store (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    store_name VARCHAR(100) NOT NULL,
    store_address VARCHAR(100) NOT NULL
);

CREATE TABLE Product (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    store_id INTEGER NOT NULL,
    CONSTRAINT FK_STORE_ID FOREIGN KEY (store_id) 
		REFERENCES Store (id)
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