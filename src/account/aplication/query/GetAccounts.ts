import IAccountRepository from "account/domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class GetAccounts {
  constructor(readonly accountRepository: IAccountRepository) { }

  async execute(): Promise<AccountOutput[]> {
    const accountsData = await this.accountRepository.getAll();
    const accountsOutput: AccountOutput[] = [];
    for (const accountData of accountsData)
      accountsOutput.push(AccountOutputAssembler.assembly(accountData));
    return accountsOutput;
  }
}
