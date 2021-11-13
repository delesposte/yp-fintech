import Cpf from "../../src/account/domain/entity/Cpf"

const VALID_CPF = "12396185730";

test("Deve validar um CPF", function () {
  const CPF = "123.961.857-30";
  const sut = new Cpf(CPF);
  expect(sut.value).toBe(VALID_CPF);
});

test("Não deve validar um cpf", function () {
  const sut = () => new Cpf("111.111.111-11");
  expect(sut).toThrow(new Error("Invalid cpf"));
});