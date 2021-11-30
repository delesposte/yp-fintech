
import GetAccounts from "../../aplication/query/GetAccounts";
import ChangeAccount from "../../aplication/usecase/ChangeAccount";
import CreateAccount from "../../aplication/usecase/CreateAccount";
import DisableAccount from "../../aplication/usecase/DisableAccount";
import EnableAccount from "../../aplication/usecase/EnableAccount";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import IDatabaseConnection from "shared/infra/database/IDatabaseConnection";
import AccountRepositoryFactory from "../factory/AccountRepositoryFactory";
import CreateAccountInputAssembler from "../../aplication/dto/CreateAccountInputAssembler";
import DatabaseConnection from "../../../shared/infra/database/DatabaseConnection";
import Config from '../../../shared/infra/config/config';

export default class AccountsController {
  private accountRepository: IAccountRepository;

  constructor(private readonly config: Config) {
    const databaseConnection: IDatabaseConnection = new DatabaseConnection(this.config);
    const accountRepositoryFactory = new AccountRepositoryFactory(databaseConnection);
    this.accountRepository = accountRepositoryFactory.createAccountRepository();
  }

  async createAccount(body: any) {
    const createAccount = new CreateAccount(this.accountRepository);
    const createInput = CreateAccountInputAssembler.assembly(body);
    return await createAccount.execute(createInput);
  }

  async changeAccount(body: any) {
    const changeAccount = new ChangeAccount(this.accountRepository);
    return await changeAccount.execute(Number(body.code), body.phone, body.adress);
  }

  async disableAccount(params: any) {
    const disableAccount = new DisableAccount(this.accountRepository);
    return await disableAccount.execute(Number(params.code));
  }

  async enableAccount(params: any) {
    const enabledAccount = new EnableAccount(this.accountRepository);
    return await enabledAccount.execute(Number(params.code));
  }

  async getAccounts() {
    const getAccounts = new GetAccounts(this.accountRepository);
    return getAccounts.execute();
  }
}
