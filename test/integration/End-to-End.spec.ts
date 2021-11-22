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

describe("Test end-to-end", function () {
  const config = new Config();
  config.DB_TYPE = 'postgres';
  config.DB_HOST = 'localhost';
  const databaseConnection = new DatabaseConnection(config);
  const accountRepositoryFactory = new AccountRepositoryFactory(databaseConnection);
  const accountRepository = accountRepositoryFactory.createAccountRepository();
  let createOutput = new AccountOutput(0, '', '', '', '', new Date(), null);

  test("Deve criar uma conexão com o banco de dados", async function () {
    await expect(databaseConnection.getConnection()).resolves.not.toThrow();
  })
  try {
    test("Deve cria uma conta", async function () {
      const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
      const createAccount = new CreateAccount(accountRepository);
      createOutput = await createAccount.execute(createInput);
      expect(createOutput.code).toBeDefined();
    })

    test("Deve alterar uma conta", async function () {
      const changeAccount = new ChangeAccount(accountRepository);
      const changeOutput = await changeAccount.execute(createOutput.code, "28999467777", "Rua legal new");
      expect(changeOutput.code).toBe(createOutput.code);
      expect(changeOutput.phone).toBe("28999467777");
      expect(changeOutput.adress).toBe("Rua legal new");
    })

    test("Deve desativar uma conta", async function () {
      const disableAccount = new DisableAccount(accountRepository);
      const disableOutput = await disableAccount.execute(createOutput.code);
      expect(disableOutput.code).toBe(createOutput.code);
      expect(disableOutput.disabledAt).toBeDefined();
    })

    test("Deve ativar uma conta", async function () {
      const enableAccount = new EnableAccount(accountRepository);
      const enabledOutput = await enableAccount.execute(createOutput.code);
      expect(enabledOutput.code).toBe(createOutput.code);
      expect(enabledOutput.disabledAt).toBeNull();
    })

    test("Deve recuperar uma conta", async function () {
      const getAccounts = new GetAccounts(accountRepository);
      const getOutputs: AccountOutput[] | undefined = await getAccounts.execute();
      if (getOutputs) {
        const accountTarget: AccountOutput | undefined = getOutputs.find(element => element.code === createOutput.code);
        if (accountTarget)
          expect(accountTarget.code).toBe(createOutput.code);
        else
          expect(accountTarget).toBeDefined();
      } else
        expect(getOutputs).toBeDefined();
    })

    test("Deve remover uma conta", async function () {
      const deleteAccount = new DeleteAccount(accountRepository);
      await expect(deleteAccount.execute(createOutput.code)).resolves.not.toThrow();
    })
  } finally {
    test("Deve fechar a conexão com o banco de dados", async function () {
      await expect(databaseConnection.closeConnection()).resolves.not.toThrow();
    })
  }
})