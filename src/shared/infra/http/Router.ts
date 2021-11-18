import IHttp from "./IHttp";

export default class Router {

  constructor(readonly http: IHttp, readonly IDatabaseConnection: any) {
    this.configure();
  }

  private configure() {
    this.http.on("/accounts", "get", async (params: any, body: any) => {
      return { status: "ok" };
    });

    this.http.on("/accounts", "post", async (params: any, body: any) => {
      return { status: "ok" };
    });

    this.http.on("/accounts/:code/disable", "post", async (params: any, body: any) => {
      return { status: "ok" };
    });

    this.http.on("/accounts/:code/enable", "post", async (params: any, body: any) => {
      return { status: "ok" };
    });

    this.http.on("/accounts/:code", "patch", async (params: any, body: any) => {
      return { status: "ok" };
    });
  }

  static new(http: IHttp, IDatabaseConnection: any) {
    return new Router(http, IDatabaseConnection);
  }
}
