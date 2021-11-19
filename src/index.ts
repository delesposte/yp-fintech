import Config from "./shared/infra/config/config";
import DatabaseConnection from "./shared/infra/database/DatabaseConnection";
import HttpServer from "./shared/infra/http/HttpServer";
import Router from "./shared/infra/http/Router";

class App {
  static execute() {
    const config = new Config();
    const http = new HttpServer(config);
    const databaseConnection = new DatabaseConnection(config);
    new Router(http, databaseConnection);
    http.listen();
  }
}

App.execute();