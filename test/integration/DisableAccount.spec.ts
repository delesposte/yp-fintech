import PlaceAccountInput from "../../src/account/aplication/dto/PlaceAccountInput";
import PlaceAccount from "../../src/account/aplication/usecase/PlaceAccount";
import DisableAccount from "../../src/account/aplication/usecase/DisableAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";

test.skip("Deve desativar uma conta no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve desativar uma conta em memória", async function () {
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory();
  const placeInput = new PlaceAccountInput("Zezinho Legal", "123.961.857-30", "28999466070", "Rua legal");
  const placeAccount = new PlaceAccount(accountRepositoryFactory);
  const disableAccount = new DisableAccount(accountRepositoryFactory);
  const placeOutput = await placeAccount.execute(placeInput);
  const disableOutput = await disableAccount.execute(placeOutput.code);
  expect(placeOutput.code === disableOutput.code).toBeTruthy();
  expect(disableOutput.disabledAt).toBeDefined();
});