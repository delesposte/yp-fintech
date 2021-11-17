import PlaceAccountInput from "../../src/account/aplication/dto/PlaceAccountInput";
import PlaceAccount from "../../src/account/aplication/usecase/PlaceAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";

test.skip("Deve cadastrar uma conta no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve cadastrar uma conta em memória", async function () {
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory();
  const placeInput = new PlaceAccountInput("Zezinho Legal", "123.961.857-30", "28999466070", "Rua legal");
  const placeAccount = new PlaceAccount(accountRepositoryFactory);
  const placeOutput = await placeAccount.execute(placeInput);
  expect(placeOutput.code).toBeDefined();
})