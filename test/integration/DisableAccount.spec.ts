import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import DisableAccount from "../../src/account/aplication/usecase/DisableAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";

test.skip("Deve desativar uma conta no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve desativar uma conta em memória", async function () {
  const memory: any = [];
  const accountRepository = new AccountRepositoryMemory(memory);
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const disableAccount = new DisableAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  const disableOutput = await disableAccount.execute(createOutput.code);
  expect(createOutput.code === disableOutput.code).toBeTruthy();
  expect(disableOutput.disabledAt).toBeDefined();
});