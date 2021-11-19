import Config from "./shared/infra/config/config";
import DatabaseConnectionAdapter from "./shared/infra/database/DatabaseConnectionAdapter";
import HttpAdapter from "./shared/infra/http/HttpAdapter";
import Router from "./shared/infra/http/Router";

class App {
  static execute() {
    const config = new Config();
    const http = new HttpAdapter(config);
    const databaseConnection = new DatabaseConnectionAdapter(config);
    new Router(http, databaseConnection);
    http.listen();
  }
}

App.execute();