import * as dotenv from 'dotenv';
import path from 'path';
export default class Config {
  public readonly NODE_ENV: string;
  public readonly API_HOST: string;
  public readonly API_PORT: number;
  public readonly API_TOKEN_ENCRYPT_PWD: string;
  public readonly DB_TYPE: string | any;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_HOST: string;
  public readonly DB_DATABASE: string;
  public readonly DB_PORT: number;

  constructor() {
    this.configDotenv();
    this.check();
    this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : '';
    this.API_HOST = process.env.HOST ? process.env.HOST : '';
    this.API_PORT = Number(process.env.PORT);
    this.API_TOKEN_ENCRYPT_PWD = process.env.TOKEN_ENCRYPT_PWD ? process.env.TOKEN_ENCRYPT_PWD : '';
    this.DB_TYPE = process.env.DB_TYPE ? process.env.DB_TYPE : '';
    this.DB_USER = process.env.DB_USER ? process.env.DB_USER : '';
    this.DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '';
    this.DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : '';
    this.DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : '';
    this.DB_PORT = Number(process.env.DB_PORT);
  }

  private check(): void {
    //Pending
  }

  isRepositoryMemory(): boolean {
    return this.DB_TYPE === "memory";
  }

  isProductionEnvironment(): boolean {
    return this.NODE_ENV === "memory";
  }

  private configDotenv(): void {
    dotenv.config(
      { path: this.getDotenvFileName() }
    );
  }

  private getDotenvFileName(): string {
    return path.resolve('.env');
  }

  get API_URL(): string {
    return 'http://' + this.API_HOST + ':' + this.API_PORT.toString();
  }
}