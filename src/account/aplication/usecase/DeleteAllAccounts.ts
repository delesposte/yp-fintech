import IAccountRepository from "../../domain/repository/IAccountRepository";

export default class DeleteAllAccounts {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(): Promise<void> {
    await this.accountRepository.deleteAll();
  }
}