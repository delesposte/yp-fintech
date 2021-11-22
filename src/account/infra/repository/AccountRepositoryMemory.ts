import { BadRequestError, NotFoundError } from "../../../shared/extend/Errors";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";
import Account from "../../domain/entity/Account";
import IAccountRepository from "../../domain/repository/IAccountRepository";

export default class AccountRepositoryMemory implements IAccountRepository {
  private readonly memory: any[] = [];

  constructor(readonly IDatabaseConnection?: IDatabaseConnection) { }

  async save(account: Account): Promise<void> {
    this.memory.push(account);
  }

  async getByCode(code: number): Promise<Account | undefined> {
    if (!code) throw new BadRequestError("Account code not informed");
    const accountData = this.memory.find(item => item.code === code);
    if (accountData) return new Account(accountData.name, accountData.cpf, accountData.phone,
      accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return undefined;
  }

  async getAll(): Promise<Account[]> {
    const accounts: Account[] = [];
    for (const accountData of this.memory)
      accounts.push(new Account(accountData.name, accountData.cpf, accountData.phone,
        accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt));
    return accounts;
  }

  async getByCpf(cpf: string): Promise<Account | undefined> {
    if (!cpf) throw new BadRequestError("Account cpf not informed");
    const accountData = this.memory.find(item => item.cpf === cpf);
    if (accountData) return new Account(accountData.name, accountData.cpf, accountData.phone,
      accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return undefined;
  }

  async update(account: Account): Promise<void> {
    if (!account) throw new BadRequestError("Account not informed");
    const accountData = this.memory.find(item => item.code === account.code);
    if (!accountData) throw new NotFoundError("Account not found");
    Object.assign(accountData, account);
  }

  async count(): Promise<number> {
    return this.memory.length;
  }
}
