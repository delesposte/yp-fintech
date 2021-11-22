import Account from "../../domain/entity/Account";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import { Connection, EntityTarget, Repository } from "typeorm";
import { AccountEntity } from "../../../shared/infra/database/entity/AccountEntity";
import { BadRequestError, NotFoundError } from "../../../shared/extend/Errors";

export default class AccountRepositoryDatabase implements IAccountRepository {
  constructor(readonly databaseConnection: IDatabaseConnection) { }

  async save(account: Account): Promise<void> {
    if (!account) throw new BadRequestError("Account not informed");
    const repository: Repository<AccountEntity> = await this.getRepository(AccountEntity);
    const entity = new AccountEntity({
      code: account.code,
      name: account.name,
      cpf: account.cpf,
      phone: account.phone,
      adress: account.adress,
      createdAt: account.createdAt,
      disabledAt: account.disabledAt,
    });
    await repository.save(entity);
  }

  async getByCode(code: number): Promise<Account | undefined> {
    if (!code) throw new BadRequestError("Account code not informed");
    const repository: Repository<AccountEntity> = await this.getRepository(AccountEntity);
    const accountData = await repository.findOne({ code: code });
    if (accountData)
      return new Account(accountData.name, accountData.cpf, accountData.phone,
        accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return undefined;
  }

  async getAll(): Promise<Account[]> {
    const accounts: Account[] = [];
    const repository: Repository<AccountEntity> = await this.getRepository(AccountEntity);
    const accountData = await repository.find();
    if (!accountData)
      return accounts;
    return accountData.map(account => new Account(account.name, account.cpf, account.phone,
      account.adress, account.code, account.createdAt, account.disabledAt));
  }

  async getByCpf(cpf: string): Promise<Account | undefined> {
    if (!cpf) throw new BadRequestError("Account cpf not informed");
    const repository: Repository<AccountEntity> = await this.getRepository(AccountEntity);
    const accountData = await repository.findOne({ cpf: cpf });
    if (accountData)
      return new Account(accountData.name, accountData.cpf, accountData.phone,
        accountData.adress, accountData.code, accountData.createdAt, accountData.disabledAt);
    return undefined;
  }

  async update(account: Account): Promise<void> {
    await this.save(account);
  }

  async delete(code: number): Promise<void> {
    if (!code) throw new BadRequestError("Account code not informed");
    const repository: Repository<AccountEntity> = await this.getRepository(AccountEntity);
    await repository.delete({ code: code });
  }

  async count(): Promise<number> {
    const repository: Repository<AccountEntity> = await this.getRepository(AccountEntity);
    return repository.count();
  }

  async getRepository<Entity>(target: EntityTarget<Entity>): Promise<Repository<Entity>> {
    const connection: Connection = await this.databaseConnection.getConnection();
    return connection.manager.getRepository(target);
  }
}
