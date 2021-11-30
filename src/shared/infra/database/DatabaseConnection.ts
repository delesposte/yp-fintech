import "reflect-metadata";
import Config from "../config/config";
import IDatabaseConnection from "./IDatabaseConnection";
import { Connection, createConnection } from "typeorm";
import { AccountEntity } from "./entity/AccountEntity";

export default class DatabaseConnection implements IDatabaseConnection {
  public fConnection: Promise<Connection> | any = null;

  constructor(private readonly config: Config) { }

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
          AccountEntity
        ],
        synchronize: true,
        logging: false
      }
      this.fConnection = await createConnection(options);
    }
    return this.fConnection
  }

  async closeConnection(): Promise<void> {
    if (this.fConnection) await this.fConnection.close();
  }

  executeStatement(statement: string, params: any) {
    return {};
  }

  isRepositoryMemory(): boolean {
    return this.config.isRepositoryMemory();
  }
}
