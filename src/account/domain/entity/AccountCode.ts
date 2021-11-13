export default class AccountCode {
  value: number;

  constructor() {
    this.value = new Date().getTime();
  }
}