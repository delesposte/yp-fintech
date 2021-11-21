import { EBadRequest } from "../../../shared/extend/Errors";
import AccountCode from "./AccountCode";
import Cpf from "./Cpf";
import Phone from "./Phone";

export default class Account {
  private fCode: AccountCode;
  private fCpf: Cpf;
  private fPhone: Phone;
  private fDisabledAt: Date | unknown = null;
  private fName: string = '';
  public adress: string;
  public readonly createdAt: Date;

  constructor(name: string, cpf: string, phone: string, adress: string, codeValue: number = 0,
    createdAt: Date = new Date(), DisabledAt: Date | unknown = null) {
    this.fCode = new AccountCode(codeValue);
    this.name = name;
    this.fCpf = new Cpf(cpf);
    this.fPhone = new Phone(phone);
    this.adress = adress;
    this.createdAt = createdAt;
    this.fDisabledAt = DisabledAt;
  }

  set name(value: string) {
    if (!value || !value.trim()) throw new EBadRequest("Invalid name");
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

  set phone(value: string) {
    this.fPhone = new Phone(value);
  }

  disable() {
    if (this.fDisabledAt) throw new EBadRequest("Account is already disabled");
    this.fDisabledAt = new Date();
  }

  enable() {
    if (!this.fDisabledAt) throw new EBadRequest("Account is already enabled");
    this.fDisabledAt = null;
  }

  get disabledAt() {
    return this.fDisabledAt;
  }
}