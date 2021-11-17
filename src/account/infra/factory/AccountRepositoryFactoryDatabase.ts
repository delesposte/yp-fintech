import IAccountRepository from "../../domain/repository/IAccountRepository";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import AccountRepositoryDatabase from "../repository/AccountRepositoryDatabase";

export default class AccountRepositoryFactoryDatabase implements IAbstractAccountRepositoryFactory {
	constructor (readonly IDatabaseConnection: IDatabaseConnection) {}

	createAccountRepository(): IAccountRepository {
		return new AccountRepositoryDatabase(this.IDatabaseConnection);
	}
}
