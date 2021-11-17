import Account from "../../domain/entity/Account";
import IAccountRepository from "../../domain/repository/IAccountRepository";

export default class AccountRepositoryMemory implements IAccountRepository {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  async save(account: Account): Promise<void> {
    this.accounts.push(account);
  }

  async get(code: number): Promise<Account> {
    if (!code) throw new Error("Account code not informed");
    const accountData = this.accounts.find(item => item.code === code);
    if (!accountData) throw new Error("Account not found");
    const account = new Account(accountData.name, accountData.cpf, accountData.phone, accountData.adress, accountData.code);
    return account;
  }

  async update(account: Account): Promise<void> {
    if (!account) throw new Error("Account not informed");
    const accountData = this.accounts.find(item => item.code === account.code);
    if (!accountData) throw new Error("Account not found");
    Object.assign(accountData, account);
  }

  async count(): Promise<number> {
    return this.accounts.length;
  }
}
