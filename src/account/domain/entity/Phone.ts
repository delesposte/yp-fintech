import HttpStatus from "../../../shared/infra/http/HttpStatus";
import HttpError from "../../../shared/infra/http/HttpError";

export default class Phone {
  private readonly VALID_LENGTH = 11;
  value: string = "";

  constructor(value: string) {
    if (!this.validate(value)) throw new HttpError(HttpStatus.BadRequest, "Invalid phone");
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