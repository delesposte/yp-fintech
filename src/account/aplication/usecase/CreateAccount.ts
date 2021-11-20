import Account from "../../domain/entity/Account";
import CreateAccountInput from "../dto/CreateAccountInput";
import AccountOutput from "../dto/AccountOutput";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";
import { EBadRequest } from "../../../shared/extend/Errors";

export default class CreateAccount {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(input: CreateAccountInput): Promise<AccountOutput> {
    const accountByCpf = await this.accountRepository.getByCpf(input.cpf);
    if (accountByCpf) throw new EBadRequest("There is already an account for this cpf");
    const account = new Account(input.name, input.cpf, input.phone, input.adress);
    await this.accountRepository.save(account);
    return AccountOutputAssembler.assembly(account);
  }
}