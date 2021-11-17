export default class AccountCode {
  value: number;

  constructor(codeValue: number = 0) {
    if (codeValue && codeValue > 0) this.value = codeValue;
    else this.value = new Date().getTime();
  }
}