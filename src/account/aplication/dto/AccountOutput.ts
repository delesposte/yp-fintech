export default class AccountOutput {
  constructor(readonly code: number, readonly name: string, readonly cpf: string,
    readonly phone: string, readonly adress: string, readonly createdAt: Date,
    readonly disabledAt: Date | unknown) { }
}