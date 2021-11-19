import AccountsController from "../../../account/infra/controller/AccountsController";
import IDatabaseConnection from "../database/IDatabaseConnection";
import IHttp from "./IHttp";

export default class Router {
  private readonly accountsController: AccountsController;

  constructor(readonly http: IHttp, readonly DatabaseConnection: IDatabaseConnection) {
    this.accountsController = new AccountsController(this.DatabaseConnection);
    this.configure();
  }

  private configure() {
    this.http.on("/", "get", async (params: any, body: any) => {
      return { message: 'API is running on ' + this.DatabaseConnection.config.API_URL };
    });

    this.http.on("/accounts", "post", async (params: any, body: any) => {
      return await this.accountsController.createAccount(body);
    });

    this.http.on("/accounts/", "patch", async (params: any, body: any) => {
      return await this.accountsController.changeAccount(body);
    });

    this.http.on("/accounts/:code/disable", "post", async (params: any, body: any) => {
      return await this.accountsController.disableAccount(params);
    });

    this.http.on("/accounts/:code/enable", "post", async (params: any, body: any) => {
      return await this.accountsController.enableAccount(params);
    });

    this.http.on("/accounts", "get", async (params: any, body: any) => {
      return await this.accountsController.getAccounts();
    });
  }
}
