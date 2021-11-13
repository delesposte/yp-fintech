
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import Account from "../../domain/entity/Account";
import PlaceAccountInput from "../dto/PlaceAccountInput";
import PlaceAccountOutput from "../dto/PlaceAccountOutput";
import PlaceAccountOutputAssembler from "../dto/PlaceAccountOutputAssembler";
import IAccountRepository from "../../domain/repository/IAccountRepository";

export default class PlaceAccount {
  private AccountRepository: IAccountRepository;

  constructor(abstractAccountRepositoryFactory: IAbstractAccountRepositoryFactory) {
    this.AccountRepository = abstractAccountRepositoryFactory.createAccountRepository();
  }

  async execute(input: PlaceAccountInput): Promise<PlaceAccountOutput> {
    const account = new Account(input.name, input.cpf, input.phone, input.adress);
    await this.AccountRepository.save(account);
    return PlaceAccountOutputAssembler.assembly(account);
  }
}