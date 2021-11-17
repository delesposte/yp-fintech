
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import Account from "../../domain/entity/Account";
import PlaceAccountInput from "../dto/PlaceAccountInput";
import AccountOutput from "../dto/AccountOutput";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class PlaceAccount {
  private accountRepository: IAccountRepository;

  constructor(abstractAccountRepositoryFactory: IAbstractAccountRepositoryFactory) {
    this.accountRepository = abstractAccountRepositoryFactory.createAccountRepository();
  }

  async execute(input: PlaceAccountInput): Promise<AccountOutput> {
    const account = new Account(input.name, input.cpf, input.phone, input.adress);
    await this.accountRepository.save(account);
    return AccountOutputAssembler.assembly(account);
  }
}