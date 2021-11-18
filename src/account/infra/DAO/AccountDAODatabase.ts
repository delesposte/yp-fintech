import AccountOutput from "../../aplication/dto/AccountOutput";
import IAccountDAO from "../../aplication/query/IAccountDAO";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";

export default class AccountDAODatabase implements IAccountDAO {
  constructor(readonly databaseConnection: IDatabaseConnection) { }

  async getAccounts(): Promise<AccountOutput[]> {
    const AccountData = await this.databaseConnection.executeStatement("", []);
    return AccountData;
  }

  async getAccount(code: number): Promise<AccountOutput> {
    const [AccountData] = await this.databaseConnection.executeStatement("", [code]);
    return AccountData;
  }
}