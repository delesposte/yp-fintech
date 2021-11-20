import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import DisableAccount from "../../src/account/aplication/usecase/DisableAccount";
import EnableAccount from "../../src/account/aplication/usecase/EnableAccount";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";
import { EBadRequest } from "../../src/shared/extend/Errors";

test("Deve ativar uma conta em memória", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const disableAccount = new DisableAccount(accountRepository);
  const enableAccount = new EnableAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  const disableOutput = await disableAccount.execute(createOutput.code);
  const enabledOutput = await enableAccount.execute(disableOutput.code);
  expect(createOutput.code === disableOutput.code).toBeTruthy();
  expect(enabledOutput.code === disableOutput.code).toBeTruthy();
  expect(enabledOutput.disabledAt).toBeNull();
});

test("Não deve ativar uma conta em memória já ativa", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const disableAccount = new DisableAccount(accountRepository);
  const enableAccount = new EnableAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  const disableOutput = await disableAccount.execute(createOutput.code);
  await enableAccount.execute(disableOutput.code);
  await expect(enableAccount.execute(disableOutput.code)).rejects.toThrow(new EBadRequest("Account is already enabled"));
});