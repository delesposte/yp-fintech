import Account from "../../domain/entity/Account";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";
import IAccountRepository from "../../domain/repository/IAccountRepository";

export default class AccountRepositoryDatabase implements IAccountRepository {
  constructor(readonly IDatabaseConnection: IDatabaseConnection) { }

  async save(account: Account): Promise<void> {

  }

  async get(code: number): Promise<Account> {
    return new Account("", "", "", "");
  }

  async getByCpf(cpf: string): Promise<Account | unknown> {
    return new Account("", "", "", "");
  }

  async update(account: Account): Promise<void> {

  }

  async count(): Promise<number> {
    return 0;
  }
}
