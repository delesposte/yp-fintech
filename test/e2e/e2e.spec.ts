import Config from "../../src/shared/infra/config/config";
import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import AccountOutput from "../../src/account/aplication/dto/AccountOutput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import ChangeAccount from "../../src/account/aplication/usecase/ChangeAccount";
import DeleteAccount from "../../src/account/aplication/usecase/DeleteAccount";
import AccountRepositoryFactory from "../../src/account/infra/factory/AccountRepositoryFactory";
import DatabaseConnection from "../../src/shared/infra/database/DatabaseConnection";
import DisableAccount from "../../src/account/aplication/usecase/DisableAccount";
import EnableAccount from "../../src/account/aplication/usecase/EnableAccount";
import GetAccounts from "../../src/account/aplication/query/GetAccounts";
import IAccountRepository from "../../src/account/domain/repository/IAccountRepository";

const config: Config = new Config('postgres', 'localhost');
const databaseConnection: DatabaseConnection = new DatabaseConnection(config);
const accountRepositoryFactory: AccountRepositoryFactory = new AccountRepositoryFactory(databaseConnection);
const accountRepository: IAccountRepository = accountRepositoryFactory.createAccountRepository();
let createOutput: AccountOutput = new AccountOutput(0, '', '', '', '', new Date(), null);

beforeAll(() => {
  return databaseConnection.getConnection()
});

afterAll(() => {
  return databaseConnection.closeConnection()
});

describe("e2e", function () {
  test("Should create an account", async function () {
    const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
    const createAccount = new CreateAccount(accountRepository);
    createOutput = await createAccount.execute(createInput);
    expect(createOutput.code).toBeDefined();
  })

  test("Should change an account", async function () {
    const changeAccount = new ChangeAccount(accountRepository);
    const changeOutput = await changeAccount.execute(createOutput.code, "28999467777", "Rua legal new");
    expect(changeOutput.code).toBe(createOutput.code);
    expect(changeOutput.phone).toBe("28999467777");
    expect(changeOutput.adress).toBe("Rua legal new");
  })

  test("Should disable an account", async function () {
    const disableAccount = new DisableAccount(accountRepository);
    const disableOutput = await disableAccount.execute(createOutput.code);
    expect(disableOutput.code).toBe(createOutput.code);
    expect(disableOutput.disabledAt).toBeDefined();
  })

  test("Should enable an account", async function () {
    const enableAccount = new EnableAccount(accountRepository);
    const enabledOutput = await enableAccount.execute(createOutput.code);
    expect(enabledOutput.code).toBe(createOutput.code);
    expect(enabledOutput.disabledAt).toBeNull();
  })

  test("Should get accounts", async function () {
    const getAccounts = new GetAccounts(accountRepository);
    const getOutputs: AccountOutput[] | undefined = await getAccounts.execute();
    expect(getOutputs).toBeDefined();
  })

  test("Should delete an account", async function () {
    const deleteAccount = new DeleteAccount(accountRepository);
    await expect(deleteAccount.execute(createOutput.code)).resolves.not.toThrow();
  })
})