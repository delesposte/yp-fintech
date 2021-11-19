import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config(
  { path: path.resolve(path.dirname(__dirname), '.env') }
);

export default class Config {
  private static fInstance: Config;
  public NODE_ENV: string | unknown;
  public API_HOST: string | unknown;
  public API_PORT: number;
  public API_TOKEN_ENCRYPT_PWD: string | unknown;
  public DB_TYPE: string | unknown;
  public DB_USER: string | unknown;
  public DB_PASSWORD: string | unknown;
  public DB_HOST: string | unknown;
  public DB_DATABASE: string | unknown;
  public DB_INSTANCE_NAME: string | unknown;
  public DB_PORT: number | unknown;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV;
    this.API_HOST = process.env.HOST;
    this.API_PORT = Number(process.env.PORT);
    this.API_TOKEN_ENCRYPT_PWD = process.env.TOKEN_ENCRYPT_PWD;
    this.DB_USER = process.env.SQL_USER;
    this.DB_PASSWORD = process.env.DB_PASSWORD;
    this.DB_HOST = process.env.DB_HOST;
    this.DB_DATABASE = process.env.DB_DATABASE;
    this.DB_INSTANCE_NAME = process.env.DB_INSTANCE_NAME;
    this.DB_PORT = Number(process.env.DB_PORT);
  }

  public static get instance(): Config {
    if (!Config.fInstance) {
      Config.fInstance = new Config();
      Config.fInstance.checkCofings();
    }
    return Config.fInstance;
  }

  private checkCofings(): void {

  }
}