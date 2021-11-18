export default class CreateAccountInput {
  constructor(readonly name: string, readonly cpf: string, readonly phone: string, readonly adress: string) {
    this.cpf = cpf.replace(/\D/g, "");
  }
}