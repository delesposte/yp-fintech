import AccountOutput from "../dto/AccountOutput";

export default interface IAccountDAO {
  getAccounts(): Promise<AccountOutput[]>;
  getAccount(code: number): Promise<AccountOutput>;
}
