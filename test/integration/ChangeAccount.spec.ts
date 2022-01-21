import ChangeAccount from "../../src/account/aplication/usecase/ChangeAccount";
import { NotFoundError } from "../../src/shared/extend/Errors";
import AccountRepositoryMockFactory from "../mocks/repositories/AccountRepositoryMockFactory";
import AccountFakeFactory from "../fixtures/AccountFakeFactory";
import IAccountRepository from "../../src/account/domain/repository/IAccountRepository";
import Account from "../../src/account/domain/entity/Account";

const accountRepositoryMocked: jest.Mocked<IAccountRepository> = AccountRepositoryMockFactory.create();
const accountFake: Account = AccountFakeFactory.create();

beforeEach(() => {
  jest.resetAllMocks();
})

describe("ChangeAccount", function () {
  test("Should change an account", async function () {
    accountRepositoryMocked.getByCode.mockResolvedValue(accountFake);

    const changeAccount = new ChangeAccount(accountRepositoryMocked);
    const changeOutput = await changeAccount.execute(accountFake.code, accountFake.phone, accountFake.adress);

    expect(changeOutput.code).toBe(accountFake.code);
    expect(changeOutput.phone).toBe(accountFake.phone);
    expect(changeOutput.adress).toBe(accountFake.adress);
    expect(accountRepositoryMocked.getByCode).toBeCalledTimes(1);
    expect(accountRepositoryMocked.getByCode).toBeCalledWith(accountFake.code);
    expect(accountRepositoryMocked.update).toBeCalledTimes(1);
    expect(accountRepositoryMocked.update).toBeCalledWith(accountFake);
  });

  test("Should return an error when not finding an account to change", async function () {
    accountRepositoryMocked.getByCode.mockResolvedValue(undefined);

    const changeAccount = new ChangeAccount(accountRepositoryMocked);

    await expect(changeAccount.execute(accountFake.code, accountFake.phone, accountFake.adress))
      .rejects.toThrow(new NotFoundError("Account not found"));

    expect(accountRepositoryMocked.getByCode).toBeCalledTimes(1);
    expect(accountRepositoryMocked.getByCode).toBeCalledWith(accountFake.code);
  });
});