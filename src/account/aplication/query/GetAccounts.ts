import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";
import IAccountDAO from "./IAccountDAO";

export default class GetAccounts {
  constructor(readonly accountDAO: IAccountDAO) { }

  async execute(): Promise<AccountOutput[]> {
    const accountsData = await this.accountDAO.getAccounts();
    const accountsOutput: AccountOutput[] = [];
    for (const accountData of accountsData)
      accountsOutput.push(AccountOutputAssembler.assembly(accountData));
    return accountsOutput;
  }
}
