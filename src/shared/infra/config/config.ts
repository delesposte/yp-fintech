import * as dotenv from 'dotenv';
import path from 'path';

export default class Config {
  private static _instance: Config;
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

  constructor(dbType: string = '', dbHost: string = '') {
    this.configDotenv();
    this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : '';
    this.API_HOST = process.env.API_HOST ? process.env.API_HOST : '';
    this.API_PORT = Number(process.env.API_PORT);
    this.API_TOKEN_ENCRYPT_PWD = process.env.API_TOKEN_ENCRYPT_PWD ? process.env.API_TOKEN_ENCRYPT_PWD : '';
    this.DB_TYPE = dbType ? dbType : (process.env.DB_TYPE ? process.env.DB_TYPE : '');
    this.DB_USER = process.env.DB_USER ? process.env.DB_USER : '';
    this.DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '';
    this.DB_HOST = dbHost ? dbHost : (process.env.DB_HOST ? process.env.DB_HOST : '');
    this.DB_DATABASE = process.env.DB_DATABASE ? process.env.DB_DATABASE : '';
    this.DB_PORT = Number(process.env.DB_PORT);
    this.check();
  }

  private check(): void {
    if (!this.NODE_ENV) throw new Error("NODE_ENV not found");
    if (!this.API_HOST) throw new Error("API_HOST not found");
    if (!this.API_PORT) throw new Error("API_PORT not found");
    if (!this.API_TOKEN_ENCRYPT_PWD) throw new Error("API_TOKEN_ENCRYPT_PWD not found");
    if (!this.DB_TYPE) throw new Error("DB_TYPE not found");
    if (!this.DB_USER) throw new Error("DB_USER not found");
    if (!this.DB_PASSWORD) throw new Error("DB_PASSWORD not found");
    if (!this.DB_DATABASE) throw new Error("DB_DATABASE not found");
    if (!this.DB_PORT) throw new Error("DB_PORT not found");
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

  static get instance(): Config {
    if (!Config._instance) Config._instance = new Config();
    return Config._instance;
  }
}