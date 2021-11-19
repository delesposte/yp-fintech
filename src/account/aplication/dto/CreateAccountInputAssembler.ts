import Account from "../../domain/entity/Account";
import CreateAccountInput from "./CreateAccountInput";

export default class CreateAccountInputAssembler {
  static assembly(account: any) {
    return new CreateAccountInput(account.name, account.cpf, account.phone, account.adress);
  }
}
