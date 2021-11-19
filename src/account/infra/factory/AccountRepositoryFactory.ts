import IAccountRepository from "account/domain/repository/IAccountRepository";
import IDatabaseConnection from "shared/infra/database/IDatabaseConnection";
import AccountRepositoryDatabase from "../repository/AccountRepositoryDatabase";
import AccountRepositoryMemory from "../repository/AccountRepositoryMemory";

export default class AccountRepositoryFactory {
  constructor(private readonly databaseConnection: IDatabaseConnection) { }

  createAccountRepository(): IAccountRepository {
    if (this.databaseConnection.config.isRepositoryMemory())
      return new AccountRepositoryMemory(this.databaseConnection);
    return new AccountRepositoryDatabase(this.databaseConnection);
  }
}
