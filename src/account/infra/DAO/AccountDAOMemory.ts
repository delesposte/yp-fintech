import AccountOutput from "../../aplication/dto/AccountOutput";
import IAccountDAO from "../../aplication/query/IAccountDAO";

export default class AccountDAOMemory implements IAccountDAO {
  constructor(private readonly memory: any[]) { }

  async getAccounts(): Promise<AccountOutput[]> {
    return this.memory;
  }

  async getAccount(code: number): Promise<AccountOutput> {
    return this.memory.find(item => item.code === code);
  }
}