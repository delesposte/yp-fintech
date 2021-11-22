import "reflect-metadata";
import Config from "../config/config";
import IDatabaseConnection from "./IDatabaseConnection";
import { Connection, createConnection } from "typeorm";

export default class DatabaseConnection implements IDatabaseConnection {
  public config: Config;
  public fConnection: Promise<Connection> | any = null;

  constructor(config: Config) {
    this.config = config;
  }

  async getConnection(): Promise<Connection> {
    if (!this.fConnection) {
      const options = {
        type: this.config.DB_TYPE,
        host: this.config.DB_HOST,
        port: this.config.DB_PORT,
        username: this.config.DB_USER,
        password: this.config.DB_PASSWORD,
        database: this.config.DB_DATABASE,
        entities: [
          __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        logging: false
      }
      this.fConnection = await createConnection(options);
    }
    return this.fConnection
  }

  executeStatement(statement: string, params: any) {
    return {};
  }
}
