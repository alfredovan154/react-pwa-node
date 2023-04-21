import { faker } from "@faker-js/faker";
import { Student } from "@/lib/types";

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const makeStudent = (): Student => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const nombre = faker.name.firstName();
  const apellidoMaterno = faker.name.lastName();
  const apellidoPaterno = faker.name.lastName();
  const nombreCompleto = nombre + " " + apellidoPaterno + " " + apellidoMaterno;

  return {
    expediente: randomNumber,
    nombre: nombre,
    apellido_paterno: apellidoPaterno,
    apellido_materno: apellidoMaterno,
    nombre_completo: nombreCompleto,
    semestre: Math.floor(Math.random() * 10),
    fecha_nacimiento: faker.date.birthdate().toLocaleDateString(),
    email: faker.internet.email(),
    genero: faker.name.gender(),
    telefono: faker.phone.number(),
  };
};

export const makeStudents = (length: number): Array<Student> => {
  return range(length).map((d) => {
    return {
      ...makeStudent(),
    };
  });
};
