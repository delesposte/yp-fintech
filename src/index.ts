import Config from "./shared/infra/config/config";
import HttpAdapter from "./shared/infra/http/HttpAdapter";
import Router from "./shared/infra/http/Router";

class App {
  static execute() {
    const http = new HttpAdapter();
    Router.new(http, null);
    http.listen(Config.instance.API_PORT);
  }
}

App.execute();