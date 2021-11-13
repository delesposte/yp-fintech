import ExpressAdapter from "./shared/infra/http/ExpressAdapter";
import Router from "./shared/infra/http/Router";

export class App {
  static execute() {
    const http = new ExpressAdapter();
    Router.new(http, null, null);
    http.listen(3000);
  }
}

App.execute();
