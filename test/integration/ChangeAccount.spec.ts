import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import ChangeAccount from "../../src/account/aplication/usecase/ChangeAccount";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";
import { anything, instance, mock, verify, when } from "ts-mockito";
import { EBadRequest } from "../../src/shared/extend/Errors";

test("Deve alterar uma conta em memória", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const changeAccount = new ChangeAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  const changeOutput = await changeAccount.execute(createOutput.code, "Zezinho Legal new", "Rua legal new");
  expect(changeOutput.code).toBe(changeOutput.code);
  expect(changeOutput.name).toBe("Zezinho Legal new");
  expect(changeOutput.adress).toBe("Rua legal new");
});

test("Não deve alterar uma conta em memória sem nome", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const changeAccount = new ChangeAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  await expect(changeAccount.execute(createOutput.code, " ", "Rua legal")).rejects.toThrow(new EBadRequest("Invalid name"));
});
