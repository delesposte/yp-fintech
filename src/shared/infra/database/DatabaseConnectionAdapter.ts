import IDatabaseConnection from "./IDatabaseConnection";

export default class DatabaseConnectionAdapter implements IDatabaseConnection {
  constructor() { }

  executeStatement(statement: string, params: any) {
    return {};
  }
}
