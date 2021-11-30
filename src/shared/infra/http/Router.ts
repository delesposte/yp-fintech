import AccountsController from "../../../account/infra/controller/AccountsController";
import HttpStatus from "./HttpStatus";
import IHttp from "./IHttp";
import Config from "../config/config";

export default class Router {
  private readonly accountsController: AccountsController;

  constructor(private readonly http: IHttp, private readonly config: Config) {
    this.accountsController = new AccountsController(config);
    this.configure();
  }

  private configure() {
    this.http.on("/", "get", HttpStatus.OK, async (params: any, body: any) => {
      return { message: 'API is running on ' + this.config.API_URL };
    });

    this.http.on("/accounts", "post", HttpStatus.Created, async (params: any, body: any) => {
      return await this.accountsController.createAccount(body);
    });

    this.http.on("/accounts/", "patch", HttpStatus.OK, async (params: any, body: any) => {
      return await this.accountsController.changeAccount(body);
    });

    this.http.on("/accounts/:code/disable", "post", HttpStatus.OK, async (params: any, body: any) => {
      return await this.accountsController.disableAccount(params);
    });

    this.http.on("/accounts/:code/enable", "post", HttpStatus.OK, async (params: any, body: any) => {
      return await this.accountsController.enableAccount(params);
    });

    this.http.on("/accounts", "get", HttpStatus.OK, async (params: any, body: any) => {
      return await this.accountsController.getAccounts();
    });
  }
}
