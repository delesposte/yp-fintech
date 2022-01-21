import Account from "../../src/account/domain/entity/Account";

export default class AccountFakeFactory {
  public static create(): Account {
    return new Account("Zezinho legal", "453.077.680-87", "28998866070", "Rua legal");
  }
}