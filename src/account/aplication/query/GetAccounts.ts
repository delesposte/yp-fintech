import Account from "account/domain/entity/Account";
import IAccountRepository from "account/domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class GetAccounts {
  constructor(readonly accountRepository: IAccountRepository) { }

  async execute(): Promise<AccountOutput[] | undefined> {
    const accounts: Account[] = await this.accountRepository.getAll();
    const accountsOutput: AccountOutput[] = [];
    if (!accounts)
      return accountsOutput;
    return accounts.map((account) => AccountOutputAssembler.assembly(account));
  }
}
