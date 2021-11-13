export default interface IDatabaseConnection {
  executeStatement(statement: string, params: any): any;
}