import AccountCode from "./AccountCode";
import Cpf from "./Cpf";
import Phone from "./Phone";

export default class Account {
  private fCode: AccountCode;
  private fCpf: Cpf;
  private fPhone: Phone;
  private fDisabledAt: Date | unknown = null;
  private fName: string = '';
  adress: string;
  readonly createdAt: Date;

  constructor(name: string, cpf: string, phone: string, adress: string, codeValue: number = 0) {
    this.fCode = new AccountCode(codeValue);
    this.name = name;
    this.fCpf = new Cpf(cpf);
    this.fPhone = new Phone(phone);
    this.adress = adress;
    this.createdAt = new Date();
  }

  set name(value: string) {
    if (!value || !value.trim()) throw new Error("Invalid name");
    this.fName = value;
  }

  get name() {
    return this.fName;
  }

  get code() {
    return this.fCode.value;
  }

  get cpf() {
    return this.fCpf.value;
  }

  get phone() {
    return this.fPhone.value;
  }

  disable() {
    this.fDisabledAt = new Date();
  }

  enable() {
    this.fDisabledAt = null;
  }

  get disabledAt() {
    return this.fDisabledAt;
  }
}