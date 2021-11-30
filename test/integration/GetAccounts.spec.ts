import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import GetAccounts from "../../src/account/aplication/query/GetAccounts";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";
import AccountOutput from "../../src/account/aplication/dto/AccountOutput";

describe("GetAccounts", function () {
  test("Should get accounts", async function () {
    const accountRepository = new AccountRepositoryMemory();
    const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
    const createAccount = new CreateAccount(accountRepository);
    await createAccount.execute(createInput);
    const getAccounts = new GetAccounts(accountRepository);
    const getOutputs: AccountOutput[] | undefined = await getAccounts.execute();
    expect(getOutputs).toBeDefined();
  });
});
