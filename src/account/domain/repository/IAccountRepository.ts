import Account from "../entity/Account";

export default interface IAccountRepository {
  save(order: Account): Promise<void>;
  count(): Promise<number>;
  get(code: number): Promise<Account>;
  update(order: Account): Promise<void>;
}
