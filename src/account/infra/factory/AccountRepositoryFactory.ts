import IAccountRepository from "../../domain/repository/IAccountRepository";
import IDatabaseConnection from "../../../shared/infra/database/IDatabaseConnection";
import IAbstractAccountRepositoryFactory from "../../domain/factory/IAbstractAccountRepositoryFactory";
import AccountRepositoryDatabase from "../repository/database/AccountRepositoryDatabase";

export default class AccountRepositoryFactory implements IAbstractAccountRepositoryFactory {
	constructor (readonly IDatabaseConnection: IDatabaseConnection) {}

	createAccountRepository(): IAccountRepository {
		return new AccountRepositoryDatabase(this.IDatabaseConnection);
	}
}
