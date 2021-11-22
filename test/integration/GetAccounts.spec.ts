import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import GetAccounts from "../../src/account/aplication/query/GetAccounts";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";
import AccountOutput from "../../src/account/aplication/dto/AccountOutput";

test("Deve recuperar duas contas em memória", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInputA = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createInputB = new CreateAccountInput("Zezinho Maneiro", "623.392.160-01", "28998860001", "Rua maneira");
  const createAccount = new CreateAccount(accountRepository);
  const createOutputA = await createAccount.execute(createInputA);
  const createOutputB = await createAccount.execute(createInputB);
  const getAccounts = new GetAccounts(accountRepository);
  const getOutputs: AccountOutput[] | undefined = await getAccounts.execute();
  if (getOutputs) {
    expect(getOutputs.length).toBe(2);
    expect(getOutputs[0].code).toBe(createOutputA.code);
    expect(getOutputs[1].code).toBe(createOutputB.code);
  } else {
    expect(getOutputs).toBeDefined();
  }
});
