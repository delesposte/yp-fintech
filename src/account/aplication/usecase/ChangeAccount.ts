import Account from "../../domain/entity/Account";
import { ENotFound } from "../../../shared/extend/Errors";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountOutput from "../dto/AccountOutput";
import AccountOutputAssembler from "../dto/AccountOutputAssembler";

export default class ChangeAccount {
  constructor(private readonly accountRepository: IAccountRepository) { }

  async execute(code: number, phone: string, adress: string): Promise<AccountOutput> {
    const account: Account = await this.accountRepository.getByCode(code);
    if (!account) throw new ENotFound("Account not found");
    account.phone = phone;
    account.adress = adress;
    await this.accountRepository.update(account);
    return AccountOutputAssembler.assembly(account);
  }
}