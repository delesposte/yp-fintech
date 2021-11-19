
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class EnableAccount {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(code: number): Promise<AccountOutput> {
    const account = await this.accountRepository.getByCode(code);
    account.enable();
    await this.accountRepository.update(account);
    return AccountOutputAssembler.assembly(account);
  }
}