import CreateAccountInput from "../../src/account/aplication/dto/CreateAccountInput";
import CreateAccount from "../../src/account/aplication/usecase/CreateAccount";
import DisableAccount from "../../src/account/aplication/usecase/DisableAccount";
import AccountRepositoryMemory from "../../src/account/infra/repository/AccountRepositoryMemory";
import { EBadRequest } from "../../src/shared/extend/Errors";

test("Deve desativar uma conta em memória", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const disableAccount = new DisableAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  const disableOutput = await disableAccount.execute(createOutput.code);
  expect(createOutput.code === disableOutput.code).toBeTruthy();
  expect(disableOutput.disabledAt).toBeDefined();
});

test("Não deve desativar uma conta em memória já desativada", async function () {
  const accountRepository = new AccountRepositoryMemory();
  const createInput = new CreateAccountInput("Zezinho Legal", "453.077.680-87", "28999466070", "Rua legal");
  const createAccount = new CreateAccount(accountRepository);
  const disableAccount = new DisableAccount(accountRepository);
  const createOutput = await createAccount.execute(createInput);
  await disableAccount.execute(createOutput.code);
  await expect(disableAccount.execute(createOutput.code)).rejects.toThrow(new EBadRequest("Account is already disabled"));
});