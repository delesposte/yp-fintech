
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class EnableAccount {
  private accountRepository: IAccountRepository;

  constructor(abstractAccountRepositoryFactory: IAbstractAccountRepositoryFactory) {
    this.accountRepository = abstractAccountRepositoryFactory.createAccountRepository();
  }

  async execute(code: number): Promise<AccountOutput> {
    const account = await this.accountRepository.get(code);
    account.enable();
    await this.accountRepository.update(account);
    return AccountOutputAssembler.assembly(account);
  }
}