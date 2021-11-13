import AccountCode from "./AccountCode";
import Cpf from "./Cpf";
import Phone from "./Phone";

export default class Account {
  private codeObj: AccountCode;
  private cpfObj: Cpf;
  private phoneObj: Phone;
  readonly name: string;
  readonly adress: string;
  readonly createdAt: Date;

  constructor(name: string, cpf: string, phone: string, adress: string) {
    this.codeObj = new AccountCode();
    if (!name || !name.trim()) throw new Error("Invalid name");
    this.name = name;
    this.cpfObj = new Cpf(cpf);
    this.phoneObj = new Phone(phone);
    this.adress = adress;
    this.createdAt = new Date();
  }

  get code() {
    return this.codeObj.value;
  }

  get cpf() {
    return this.cpfObj.value;
  }

  get phone() {
    return this.phoneObj.value;
  }
}