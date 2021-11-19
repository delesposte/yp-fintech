import AccountsController from "account/infra/controller/AccountsController";
import IDatabaseConnection from "../database/IDatabaseConnection";
import IHttp from "./IHttp";

export default class Router {

  constructor(readonly http: IHttp, readonly IDatabaseConnection: IDatabaseConnection) {
    this.configure();
  }

  private configure() {
    this.http.on("/accounts", "post", async (params: any, body: any) => {
      const accountsController = new AccountsController(this.IDatabaseConnection);
      return accountsController.createAccount(params, body);
    });

    this.http.on("/accounts/:code", "patch", async (params: any, body: any) => {
      const accountsController = new AccountsController(this.IDatabaseConnection);
      return accountsController.changeAccount(params, body);
    });

    this.http.on("/accounts/:code/disable", "post", async (params: any, body: any) => {
      const accountsController = new AccountsController(this.IDatabaseConnection);
      return accountsController.disableAccount(params, body);
    });

    this.http.on("/accounts/:code/enable", "post", async (params: any, body: any) => {
      const accountsController = new AccountsController(this.IDatabaseConnection);
      return accountsController.enableAccount(params, body);
    });

    this.http.on("/accounts", "get", async (params: any, body: any) => {
      const accountsController = new AccountsController(this.IDatabaseConnection);
      return accountsController.getAccounts(params, body);
    });
  }

  static new(http: IHttp, IDatabaseConnection: any) {
    return new Router(http, IDatabaseConnection);
  }
}
