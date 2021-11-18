import GetAccounts from "account/aplication/query/GetAccounts";
import CreateAccount from "account/aplication/usecase/CreateAccount";
import IDatabaseConnection from "shared/infra/database/IDatabaseConnection";
import AccountDAODatabase from "../DAO/AccountDAODatabase";
import AccountRepositoryFactoryDatabase from "../factory/AccountRepositoryFactoryDatabase";

export default class AccountsController {
  constructor(readonly databaseConnection: IDatabaseConnection) { }

  getAccounts(params: any, body: any) {
    const getAccounts = new GetAccounts(new AccountDAODatabase(this.databaseConnection));
    return getAccounts.execute();
  }

  async CreateAccount(params: any, body: any) {
    const createAccount = new CreateAccount(new AccountRepositoryFactoryDatabase(this.databaseConnection));
    return await createAccount.execute(body);
  }
}
