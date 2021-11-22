export default class AccountCode {
  value: number;

  constructor(codeValue: number = 0) {
    if (codeValue && codeValue > 0) this.value = codeValue;
    else this.value = this.generateRandomCode();
  }

  private generateRandomCode(): number {
    const data = new Date();
    const code = data.getFullYear().toString().substr(2, 2) +
      data.getMonth().toString() + data.getDate().toString() +
      data.getHours().toString() + data.getMinutes().toString() +
      data.getSeconds().toString();
    return Number(code.substr(0, 10));
  }
}