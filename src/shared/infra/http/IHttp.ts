export default interface IHttp {
  on(url: string, method: string, successStatusCode: number, fn: any): void;
  listen(port: number): void;
};
