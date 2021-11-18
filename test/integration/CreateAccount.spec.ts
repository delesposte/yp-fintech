import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";

test.skip("Deve criar uma conta no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve criar uma conta em memória", async function () {
  const memory: any = [];
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory(memory);
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepositoryFactory);
  const createOutput = await createAccount.execute(createInput);
  expect(createOutput.code).toBeDefined();
});

test("Não deve criar mais de uma conta em memória por CPF", async function () {
  const memory: any = [];
  const accountRepositoryFactory = new AccountRepositoryFactoryMemory(memory);
  const createInputA = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createInputB = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");  
  const createAccount = new CreateAccount(accountRepositoryFactory);
  await createAccount.execute(createInputA);
  await expect(createAccount.execute(createInputB)).rejects.toThrow(new Error("There is already an account for this cpf"));  
});