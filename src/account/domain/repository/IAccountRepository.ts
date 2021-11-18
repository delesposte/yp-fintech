import Account from "../entity/Account";

export default interface IAccountRepository {
  save(order: Account): Promise<void>;
  count(): Promise<number>;
  get(code: number): Promise<Account>;
  getByCpf(cpf: string): Promise<Account | unknown>;
  update(order: Account): Promise<void>;
}
