
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";
import Account from "../../domain/entity/Account";
import { ENotFound } from "../../../shared/extend/Errors";

export default class DisableAccount {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(code: number): Promise<AccountOutput> {
    const account: Account = await this.accountRepository.getByCode(code);
    if (!account) throw new ENotFound("Account not found");
    account.disable();
    await this.accountRepository.update(account);
    return AccountOutputAssembler.assembly(account);
  }
}