import GetAccounts from "account/aplication/query/GetAccounts";
import ChangeAccount from "account/aplication/usecase/ChangeAccount";
import CreateAccount from "account/aplication/usecase/CreateAccount";
import DisableAccount from "account/aplication/usecase/DisableAccount";
import EnableAccount from "account/aplication/usecase/EnableAccount";
import IDatabaseConnection from "shared/infra/database/IDatabaseConnection";
import AccountDAODatabase from "../DAO/AccountDAODatabase";
import AccountRepositoryDatabase from "../repository/AccountRepositoryDatabase";

export default class AccountsController {
  constructor(readonly databaseConnection: IDatabaseConnection) { }

  async createAccount(params: any, body: any) {
    const createAccount = new CreateAccount(new AccountRepositoryDatabase(this.databaseConnection));
    return await createAccount.execute(body);
  }

  async changeAccount(params: any, body: any) {
    const changeAccount = new ChangeAccount(new AccountRepositoryDatabase(this.databaseConnection));
    return await changeAccount.execute(body.code, body.nem, body.adress);
  }

  async disableAccount(params: any, body: any) {
    const disableAccount = new DisableAccount(new AccountRepositoryDatabase(this.databaseConnection));
    return await disableAccount.execute(body.code);
  }

  async enableAccount(params: any, body: any) {
    const enabledAccount = new EnableAccount(new AccountRepositoryDatabase(this.databaseConnection));
    return await enabledAccount.execute(body.code);
  }

  async getAccounts(params: any, body: any) {
    const getAccounts = new GetAccounts(new AccountDAODatabase(this.databaseConnection));
    return getAccounts.execute();
  }
}
