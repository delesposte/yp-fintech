import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";
import { BadRequestError } from "../../src/shared/extend/Errors";

describe("CreateAccount", function () {
  test("Should create an account", async function () {
    const accountRepository = new AccountRepositoryMemory();
    const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
    const createAccount = new CreateAccount(accountRepository);
    const createOutput = await createAccount.execute(createInput);
    expect(createOutput.code).toBeDefined();
  });

  test("Should not create more than one account by CPF", async function () {
    const accountRepository = new AccountRepositoryMemory();
    const createInputA = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
    const createInputB = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
    const createAccount = new CreateAccount(accountRepository);
    await createAccount.execute(createInputA);
    await expect(createAccount.execute(createInputB)).rejects.toThrow(new BadRequestError("There is already an account for this cpf"));
  });
});