import "reflect-metadata";
import Config from "./shared/infra/config/config";
import HttpServer from "./shared/infra/http/HttpServer";
import Router from "./shared/infra/http/Router";

class App {
  static async execute() {
    const http = new HttpServer(Config.instance);
    new Router(http, Config.instance);
    http.listen();
  }
}

App.execute();

/*to-do list

- change repository memory to repository database and use mock;
- include paths to import best practices;
- create a test database;
- create an injection dependency container;
- improve readme and explain how to test the app with jest and Postman.

*/