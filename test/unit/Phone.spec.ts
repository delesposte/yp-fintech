import Phone from "../../src/account/domain/entity/Phone";

const PHONE_VALID = "28999466070";

test("Deve validar um telefone com máscara", function () {
  const sut = new Phone("(28)9-9946-6070");
  expect(sut.value).toBe(PHONE_VALID);
});

test("Deve validar um telefone sem máscara", function () {
  const sut = new Phone("28999466070");
  expect(sut.value).toBe(PHONE_VALID);
});

test("Não deve validar um telefone", function () {
  const sut = () => new Phone("9-9946-6070");
  expect(sut).toThrow(new Error("Invalid phone"));
});