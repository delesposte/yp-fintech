import Account from "../../domain/entity/Account";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import { Connection } from "typeorm";
import { AccountEntity } from "../../../shared/infra/database/entity/AccountEntity";

export default class AccountRepositoryDatabase implements IAccountRepository {
  constructor(readonly databaseConnection: IDatabaseConnection) { }

  async save(account: Account): Promise<void> {
    const connection: Connection = await this.databaseConnection.getConnection();
    const repository = connection.manager.getRepository(AccountEntity);
    const entity = new AccountEntity();
    entity.code = account.code;
    entity.name = account.name;
    entity.cpf = account.cpf;
    entity.phone = account.phone;
    entity.adress = account.adress;
    entity.createdAt = account.createdAt;
    entity.disabledAt = account.disabledAt;
    await repository.save(entity);
  }

  async getByCode(code: number): Promise<Account | any> {
    const connection: Connection = await this.databaseConnection.getConnection();
    const repository = connection.manager.getRepository(AccountEntity);
    const accountData = await repository.findOne({ code: code });
    if (accountData)
      return new Account(accountData.name, accountData.cpf, accountData.phone,
        accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return null;
  }

  async getAll(): Promise<Account[] | any> {
    const accounts: Account[] = [];
    const connection: Connection = await this.databaseConnection.getConnection();
    const repository = connection.manager.getRepository(AccountEntity);
    const accountData = await repository.find();
    if (accountData)
      for (const account of accountData)
        accounts.push(new Account(account.name, account.cpf, account.phone,
          account.adress, account.code, account.createdAt, account.disabledAt));
    return accounts;
  }

  async getByCpf(cpf: string): Promise<Account | any> {
    const connection: Connection = await this.databaseConnection.getConnection();
    const repository = connection.manager.getRepository(AccountEntity);
    const accountData = await repository.findOne({ cpf: cpf });
    if (accountData)
      return new Account(accountData.name, accountData.cpf, accountData.phone,
        accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return null;
  }

  async update(account: Account): Promise<void> {
    await this.save(account);
  }

  async count(): Promise<number> {
    const connection: Connection = await this.databaseConnection.getConnection();
    const repository = connection.manager.getRepository(AccountEntity);
    return repository.count();
  }
}
