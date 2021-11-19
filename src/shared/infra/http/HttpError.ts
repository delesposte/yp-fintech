export default class HttpError extends Error {
  constructor(public errorStatusCode: number, message: string) {
    super(message);
  }
};