import AccountCode from "../../src/account/domain/entity/AccountCode";

test("Deve criar o código de uma conta", function () {
  const sut = new AccountCode();
  expect((sut.value > 1)).toBeTruthy();
});