import Account from "account/domain/entity/Account";
import PlaceAccountOutput from "./PlaceAccountOutput";

export default class PlaceAccountOutputAssembler {
  static assembly(account: Account) {
    return new PlaceAccountOutput(account.code, account.name, account.cpf, account.phone, account.adress);
  }
}
