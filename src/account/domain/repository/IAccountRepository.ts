import Account from "../entity/Account";

export default interface IAccountRepository {
  save(account: Account): Promise<void>;
  count(): Promise<number>;
  getByCode(code: number): Promise<Account | undefined>;
  getAll(): Promise<Account[]>;
  getByCpf(cpf: string): Promise<Account | undefined>;
  update(account: Account): Promise<void>;
  delete(code: number): Promise<void>;
}
