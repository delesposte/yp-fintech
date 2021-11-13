export default interface IHttp {
  on(url: string, method: string, fn: any): void;
  listen(port: number): void;
};
