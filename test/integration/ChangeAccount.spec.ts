import PlaceAccountInput from "../../src/account/aplication/dto/PlaceAccountInput";
import PlaceAccount from "../../src/account/aplication/usecase/PlaceAccount";
import ChangeAccount from "../../src/account/aplication/usecase/ChangeAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";

test.skip("Deve alterar uma conta no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve alterar uma conta em memória", async function () {
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory();
  const name = "Zezinho Legal";
  const adress = "Rua legal";
  const placeInput = new PlaceAccountInput(name, "123.961.857-30", "28999466070", adress);
  const placeAccount = new PlaceAccount(accountRepositoryFactory);
  const changeAccount = new ChangeAccount(accountRepositoryFactory);
  const placeOutput = await placeAccount.execute(placeInput);
  const changeOutput = await changeAccount.execute(placeOutput.code, name + "new", adress + "new");
  expect(changeOutput.code === changeOutput.code).toBeTruthy();
  expect(changeOutput.name === name + "new").toBeTruthy();
  expect(changeOutput.adress === adress + "new").toBeTruthy();
});

test("Não deve alterar uma conta em memória sem nome", async function () {
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory();
  const placeInput = new PlaceAccountInput("Zezinho Legal", "123.961.857-30", "28999466070", "Rua legal");
  const placeAccount = new PlaceAccount(accountRepositoryFactory);
  const changeAccount = new ChangeAccount(accountRepositoryFactory);
  const placeOutput = await placeAccount.execute(placeInput);
  const sut = async () => await changeAccount.execute(placeOutput.code, "", "Rua legal");
  expect(sut).toThrow(new Error("Invalid name"));
});