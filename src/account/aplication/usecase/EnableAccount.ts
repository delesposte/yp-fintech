
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";
import Account from "../../domain/entity/Account";
import { NotFoundError } from "../../../shared/extend/Errors";

export default class EnableAccount {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(code: number): Promise<AccountOutput> {
    const account: Account | undefined = await this.accountRepository.getByCode(code);
    if (!account) throw new NotFoundError("Account not found");
    account.enable();
    await this.accountRepository.update(account);
    return AccountOutputAssembler.assembly(account);
  }
}