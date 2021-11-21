import Account from "../entity/Account";

export default interface IAccountRepository {
  save(account: Account): Promise<void>;
  count(): Promise<number>;
  getByCode(code: number): Promise<Account | any>;
  getAll(): Promise<Account[]>;
  getByCpf(cpf: string): Promise<Account | any>;
  update(account: Account): Promise<void>;
}
