import Account from "../entity/Account";

export default interface IAccountRepository {
  save(account: Account): Promise<void>;
  count(): Promise<number>;
  getByCode(code: number): Promise<Account | undefined>;
  getAll(): Promise<Account[] | undefined>;
  getByCpf(cpf: string): Promise<Account | undefined>;
  update(account: Account): Promise<void>;
}
