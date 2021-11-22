import Account from "../../domain/entity/Account";
import AccountOutput from "./AccountOutput";

export default class AccountOutputAssembler {
  static assembly(account: Account) {
    return new AccountOutput(account.code, account.name, account.cpf, account.phone,
      account.adress, account.createdAt, account.disabledAt)
  }
}
