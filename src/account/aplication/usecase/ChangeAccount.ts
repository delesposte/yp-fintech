
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class ChangeAccount {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(code: number, name: string, adress: string): Promise<AccountOutput> {
    const account = await this.accountRepository.get(code);
    account.name = name;
    account.adress = adress;
    await this.accountRepository.update(account);
    return AccountOutputAssembler.assembly(account);
  }
}