import IAccountRepository from "../../domain/repository/IAccountRepository";
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import AccountRepositoryMemory from "../repository/AccountRepositoryMemory";

export default class AccountRepositoryFactoryMemory implements IAbstractAccountRepositoryFactory {
  private instanceAccountRepository: IAccountRepository | unknown = null;

  constructor() { }

  createAccountRepository(): IAccountRepository {
    if (!this.instanceAccountRepository)
      this.instanceAccountRepository = new AccountRepositoryMemory();
    return this.instanceAccountRepository as IAccountRepository;
  }
}
