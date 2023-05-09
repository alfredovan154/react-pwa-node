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
  const id = Math.floor(Math.random() * 1000);
  const enrollNumber = Math.floor(Math.random() * 1000).toString();
  const nombre = faker.name.firstName();
  const apellidoMaterno = faker.name.lastName();
  const apellidoPaterno = faker.name.lastName();
  const nombreCompleto = nombre + " " + apellidoPaterno + " " + apellidoMaterno;

  return {
    id: id,
    enrollNumber: enrollNumber,
    firstName: nombre,
    surnames: apellidoPaterno + apellidoMaterno,
    fullName: nombreCompleto,
    semester: Math.floor(Math.random() * 10),
    birthdate: faker.date.birthdate().toLocaleDateString(),
    email: faker.internet.email(),
    gender: faker.name.gender(),
    phoneNumber: faker.phone.number(),
    address: "xd",
  };
};

export const makeStudents = (length: number): Array<Student> => {
  return range(length).map((d) => {
    return {
      ...makeStudent(),
    };
  });
};
