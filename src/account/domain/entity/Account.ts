import { EBadRequest } from "../../../shared/extend/Errors";
import AccountCode from "./AccountCode";
import Cpf from "./Cpf";
import Phone from "./Phone";

export default class Account {
  private _code: AccountCode;
  private _cpf: Cpf;
  private _phone: Phone;
  private fDisabledAt: Date | any = null;
  private fName: string = '';
  public adress: string;
  public readonly createdAt: Date;

  constructor(name: string, cpf: string, phone: string, adress: string, codeValue: number = 0,
    createdAt: Date = new Date(), DisabledAt: Date | any = null) {
    this._code = new AccountCode(codeValue);
    this.name = name;
    this._cpf = new Cpf(cpf);
    this._phone = new Phone(phone);
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
    return this._code.value;
  }

  get cpf() {
    return this._cpf.value;
  }

  get phone() {
    return this._phone.value;
  }

  set phone(value: string) {
    this._phone = new Phone(value);
  }

  disable() {
    if (this.fDisabledAt) throw new EBadRequest("Account is already disabled");
    this.fDisabledAt = new Date();
  }

  enable() {
    if (!this.fDisabledAt) throw new EBadRequest("Account is already enabled");
    this.fDisabledAt = null;
  }

  get disabledAt(): Date {
    return this.fDisabledAt;
  }
}