import Account from "../../src/account/domain/entity/Account";
import { BadRequestError } from "../../src/shared/extend/Errors";

test("Não deve criar uma conta com CPF inválido", function () {
  const sut = () => new Account("Zezinho do mal", "111.111.111-11", "28998866070", "Rua do mal");
  expect(sut).toThrow(new BadRequestError("Invalid cpf"));
});

test("Não deve criar uma conta com nome vazio", function () {
  const sut = () => new Account("", "453.077.680-87", "28998866070", "Rua do mal");
  expect(sut).toThrow(new BadRequestError("Invalid name"));
});

test("Não deve criar uma conta com nome em branco", function () {
  const sut = () => new Account("  ", "453.077.680-87", "28998866070", "Rua do mal");
  expect(sut).toThrow(new BadRequestError("Invalid name"));
});

test("Não deve criar uma conta com telefone inválido", function () {
  const sut = () => new Account("Zezinho do mal", "453.077.680-87", "2899886607", "Rua do mal");
  expect(sut).toThrow(new BadRequestError("Invalid phone"));
});

test("Deve criar uma conta", function () {
  const sut = new Account("Zezinho legal", "453.077.680-87", "28998866070", "Rua legal");
  expect(sut).toBeDefined();
  expect(sut.code).toBeDefined();
  expect(sut.name).toBeDefined();
  expect(sut.cpf).toBeDefined();
  expect(sut.phone).toBeDefined();
  expect(sut.adress).toBeDefined();
  expect(sut.createdAt).toBeDefined();
});