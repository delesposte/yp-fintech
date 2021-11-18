import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import GetAccounts from "../../src/account/aplication/query/GetAccounts";
import DatabaseConnectionAdapter from "../../src/shared/infra/database/DatabaseConnectionAdapter";
import AccountRepositoryFactoryDatabase from "../../src/account/infra/factory/AccountRepositoryFactoryDatabase";
import AccountRepositoryFactoryMemory from "../../src/account/infra/factory/AccountRepositoryFactoryMemory";
import AccountDAOMemory from "../../src/account/infra/DAO/AccountDAOMemory";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";

test.skip("Deve recuperar duas contas no banco de dados", async function () {
  const databaseConnection = new DatabaseConnectionAdapter();
  const accountRepositoryFactory = new AccountRepositoryFactoryDatabase(databaseConnection);
});

test("Deve recuperar duas contas em memória", async function () {
  const memory: any = [];
  const accountRepository = new AccountRepositoryMemory(memory);
  const accountDAO = new AccountDAOMemory(memory);
  const createInputA = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createInputB = new CreateAccountInput("Zezinho Maneiro", "623.392.160-01", "28998860001", "Rua maneira");
  const createAccount = new CreateAccount(accountRepository);
  const createOutputA = await createAccount.execute(createInputA);
  const createOutputB = await createAccount.execute(createInputB);
  const getAccounts = new GetAccounts(accountDAO);
  const getOutputs = await getAccounts.execute();
  expect(getOutputs.length).toBe(2);
  expect(getOutputs[0].code).toBe(createOutputA.code);
  expect(getOutputs[1].code).toBe(createOutputB.code);
});
