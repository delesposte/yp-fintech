export default class PlaceAccountOutput {
  constructor(readonly code: number, readonly name: string, readonly cpf: string,
    readonly phone: string, readonly adress: string) { }
}