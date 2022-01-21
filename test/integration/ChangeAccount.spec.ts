import ChangeAccount from "../../src/account/aplication/usecase/ChangeAccount";
import { NotFoundError } from "../../src/shared/extend/Errors";
import IAccountRepository from "../../src/account/domain/repository/IAccountRepository";
import Account from "../../src/account/domain/entity/Account";

const repositoryMocked: jest.Mocked<IAccountRepository> = {
  save: jest.fn(),
  count: jest.fn(),
  getByCode: jest.fn(),
  getAll: jest.fn(),
  getByCpf: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  deleteAll: jest.fn()
}

beforeEach(() => {
  jest.resetAllMocks();
})

const accountMocked = {
  code: 1,
  phone: "28999467777",
  adress: "Rua legal new"
} as Account;

describe("ChangeAccount", function () {
  test("Should change an account", async function () {
    repositoryMocked.getByCode.mockResolvedValue(accountMocked);

    const changeAccount = new ChangeAccount(repositoryMocked);
    const changeOutput = await changeAccount.execute(accountMocked.code, accountMocked.phone, accountMocked.adress);

    expect(changeOutput.code).toBe(accountMocked.code);
    expect(changeOutput.phone).toBe(accountMocked.phone);
    expect(changeOutput.adress).toBe(accountMocked.adress);
    expect(repositoryMocked.getByCode).toBeCalledTimes(1);
    expect(repositoryMocked.getByCode).toBeCalledWith(accountMocked.code);
    expect(repositoryMocked.update).toBeCalledTimes(1);
    expect(repositoryMocked.update).toBeCalledWith(accountMocked);
  });

  test("Should return an error when not finding an account to change", async function () {
    repositoryMocked.getByCode.mockResolvedValue(undefined);

    const changeAccount = new ChangeAccount(repositoryMocked);

    await expect(changeAccount.execute(accountMocked.code, accountMocked.phone, accountMocked.adress))
      .rejects.toThrow(new NotFoundError("Account not found"));

    expect(repositoryMocked.getByCode).toBeCalledTimes(1);
    expect(repositoryMocked.getByCode).toBeCalledWith(accountMocked.code);
  });
});