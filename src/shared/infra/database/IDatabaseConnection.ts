import Config from "../config/config";

export default interface IDatabaseConnection {
  config: Config;
  executeStatement(statement: string, params: any): any;
}