import { BadRequestError } from "../../../shared/extend/Errors";

export default class Cpf {
  private readonly VALID_LENGTH = 11;
  private readonly FACTOR_FIRST_VERIFIER_DIGIT = 10;
  private readonly FACTOR_SECOND_VERIFIER_DIGIT = 11;
  value: string = "";

  constructor(value: string) {
    if (!this.validate(value)) throw new BadRequestError("Invalid cpf");
  }

  private validate(rawCpf: string) {
    if (!rawCpf) return false;
    const cpf = this.clean(rawCpf);
    if (cpf.length !== this.VALID_LENGTH) return false;
    if (this.areAllDigitsEqual(cpf)) return false;
    const firstVerifierDigit = this.calculateDigit(cpf, this.FACTOR_FIRST_VERIFIER_DIGIT);
    const secondVerifierDigit = this.calculateDigit(cpf, this.FACTOR_SECOND_VERIFIER_DIGIT);
    const verifierDigit = this.extractVerifierDigit(cpf);
    const calculatedVerifiedDigit = `${firstVerifierDigit}${secondVerifierDigit}`;
    if (verifierDigit !== calculatedVerifiedDigit) return
    this.value = cpf;
    return true;
  }

  private clean(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  private areAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every(c => c === firstDigit);
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf)
      if (factor > 1) total += parseInt(digit) * factor--;
    const rest = total % 11;
    return (rest < 2) ? 0 : (11 - rest);
  }

  private extractVerifierDigit(cpf: string) {
    return cpf.slice(9);
  }
}