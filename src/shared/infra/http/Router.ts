import IHttp from "./IHttp";

export default class Router {

  constructor(readonly http: IHttp, readonly IDatabaseConnection: any, readonly eventBus: any) {
    this.configure();
  }

  private configure() {
    this.http.on("/", "get", async (params: any, body: any) => {
      return { status: "ok" };
    });
  }

  static new(http: IHttp, IDatabaseConnection: any, eventBus: any) {
    return new Router(http, IDatabaseConnection, eventBus);
  }
}
