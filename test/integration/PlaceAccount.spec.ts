import PlaceAccountInput from "../../src/account/aplication/dto/PlaceAccountInput";
import PlaceAccount from "../../src/account/aplication/usecase/PlaceAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactory from "../../src/account/infra/factory/AccountRepositoryFactory";

test("Deve registrar uma conta", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactory(databaseConnection);
  const input = new PlaceAccountInput("Zezinho Legal", "123.961.857-30", "28999466070", "Rua legal");
  const placeAccount = new PlaceAccount(accountRepositoryFactory);
  const output = await placeAccount.execute(input);
  expect(output.code).toBeDefined();
})