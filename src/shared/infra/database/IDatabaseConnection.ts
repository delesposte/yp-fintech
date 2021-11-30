import { Connection } from "typeorm";
import Config from "../config/config";

export default interface IDatabaseConnection {
  getConnection(): Promise<Connection>;
  executeStatement(statement: string, params: any): any;
  isRepositoryMemory(): boolean;
}