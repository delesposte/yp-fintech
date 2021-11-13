import HttpAdapter from "./shared/infra/http/HttpAdapter";
import Router from "./shared/infra/http/Router";

class App {
  static execute() {
    const http = new HttpAdapter();
    Router.new(http, null, null);
    http.listen(3000);
  }
}

App.execute();
