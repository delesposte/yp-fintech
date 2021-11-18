import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import ChangeAccount from "../../src/account/aplication/usecase/ChangeAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";

test.skip("Deve alterar uma conta no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve alterar uma conta em memória", async function () {
  const memory: any = [];
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory(memory);
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepositoryFactory);
  const changeAccount = new ChangeAccount(accountRepositoryFactory);
  const createOutput = await createAccount.execute(createInput);
  const changeOutput = await changeAccount.execute(createOutput.code, "Zezinho Legal new", "Rua legal new");
  expect(changeOutput.code === changeOutput.code).toBeTruthy();
  expect(changeOutput.name === "Zezinho Legal new").toBeTruthy();
  expect(changeOutput.adress === "Rua legal new").toBeTruthy();
});

test("Não deve alterar uma conta em memória sem nome", async function () {
  const memory: any = [];
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory(memory);
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepositoryFactory);
  const changeAccount = new ChangeAccount(accountRepositoryFactory);
  const createOutput = await createAccount.execute(createInput);
  await expect(changeAccount.execute(createOutput.code, " ", "Rua legal")).rejects.toThrow(new Error("Invalid name"));
});