import { EBadRequest } from "../../../shared/extend/Errors";

export default class Phone {
  private readonly VALID_LENGTH = 11;
  value: string = "";

  constructor(value: string) {
    if (!this.validate(value)) throw new EBadRequest("Invalid phone");
  }

  private validate(rawPhone: string) {
    if (!rawPhone) return false;
    const phone = this.clean(rawPhone);
    if (phone.length !== this.VALID_LENGTH) return false;
    this.value = phone;
    return true;
  }

  private clean(Phone: string) {
    return Phone.replace(/\D/g, "");
  }
}