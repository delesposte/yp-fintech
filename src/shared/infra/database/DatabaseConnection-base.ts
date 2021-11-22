import Config from "../config/config";
import IDatabaseConnection from "./IDatabaseConnection";

export default class DatabaseConnection implements IDatabaseConnection {
  public config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  executeStatement(statement: string, params: any) {
    return {};
  }
}
