CREATE TABLE Students(
    id INTEGER PRIMARY KEY,
	enrollNumber INTEGER NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    surnames VARCHAR(100) NOT NULL,
    fullName VARCHAR(150) NOT NULL,
    semester INTEGER NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    phoneNumber VARCHAR(10) NOT NULL,
    address VARCHAR(150)
);