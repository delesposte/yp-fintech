import IHttp from "./IHttp";

export default class Router {

  constructor(readonly http: IHttp, readonly databaseConnection: any, readonly eventBus: any) {
    this.configure();
  }

  configure() {
    this.http.on("/", "get", async (params: any, body: any) => {
      return { status: "ok" };
    });
  }

  static new(http: IHttp, databaseConnection: any, eventBus: any) {
    return new Router(http, databaseConnection, eventBus);
  }
}
