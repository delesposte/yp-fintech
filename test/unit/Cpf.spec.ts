import Cpf from "../../src/account/domain/entity/Cpf";
import { BadRequestError } from "../../src/shared/extend/Errors";

const VALID_CPF = "45307768087";

test("Deve validar um CPF", function () {
  const CPF = "453.077.680-87";
  const sut = new Cpf(CPF);
  expect(sut.value).toBe(VALID_CPF);
});

test("Não deve validar um cpf", function () {
  const sut = () => new Cpf("111.111.111-11");
  expect(sut).toThrow(new BadRequestError("Invalid cpf"));
});