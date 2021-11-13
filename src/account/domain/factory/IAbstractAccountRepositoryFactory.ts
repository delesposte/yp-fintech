import IAccountRepository from "../repository/IAccountRepository";

export default interface IAbstractAccountRepositoryFactory {
	createAccountRepository(): IAccountRepository;
}
