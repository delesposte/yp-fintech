import IDatabaseConnection from "shared/infra/database/IDatabaseConnection";
import Account from "../../domain/entity/Account";
import IAccountRepository from "../../domain/repository/IAccountRepository";

export default class AccountRepositoryMemory implements IAccountRepository {
  private readonly memory: any[] = [];

  constructor(readonly IDatabaseConnection?: IDatabaseConnection) { }

  async save(account: Account): Promise<void> {
    this.memory.push(account);
  }

  async getByCode(code: number): Promise<Account> {
    if (!code) throw new Error("Account code not informed");
    const accountData = this.memory.find(item => item.code === code);
    if (!accountData) throw new Error("Account not found");
    const account = new Account(accountData.name, accountData.cpf, accountData.phone,
      accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return account;
  }

  async getAll(): Promise<Account[]> {
    const accounts: Account[] = [];
    for (const accountData of this.memory)
      accounts.push(new Account(accountData.name, accountData.cpf, accountData.phone,
        accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt));
    return accounts;
  }

  async getByCpf(cpf: string): Promise<Account | unknown> {
    if (!cpf) throw new Error("Account cpf not informed");
    const accountData = this.memory.find(item => item.cpf === cpf);
    if (accountData) return new Account(accountData.name, accountData.cpf, accountData.phone,
      accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return null;
  }

  async update(account: Account): Promise<void> {
    if (!account) throw new Error("Account not informed");
    const accountData = this.memory.find(item => item.code === account.code);
    if (!accountData) throw new Error("Account not found");
    Object.assign(accountData, account);
  }

  async count(): Promise<number> {
    return this.memory.length;
  }
}
