import { Connection } from "typeorm";
import Config from "../config/config";

export default interface IDatabaseConnection {
  config: Config;
  getConnection(): Promise<Connection>;
  executeStatement(statement: string, params: any): any;
}