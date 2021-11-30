import Config from "../config/config";

export default interface IHttp {
  on(url: string, method: string, successStatusCode: number, fn: any): void;
  listen(port: number): void;
};
