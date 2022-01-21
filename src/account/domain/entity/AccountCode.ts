export default class AccountCode {
  private readonly _value: number;

  constructor(codeValue: number = 0) {
    if (codeValue > 0) 
      this._value = codeValue;
    else 
      this._value = this.generateRandomCode();
  }

  private generateRandomCode(): number {
    const data = new Date();
    const code = data.getFullYear().toString().substr(2, 2) +
      data.getMonth().toString() + data.getDate().toString() +
      data.getHours().toString() + data.getMinutes().toString() +
      data.getSeconds().toString();
    return Number(code.substr(0, 10));
  }

  get value(): number {
    return this._value;
  }
}