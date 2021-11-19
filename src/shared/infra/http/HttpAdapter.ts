import IHttp from "./IHttp";
import HttpStatus from "./HttpStatus";
import express from "express";
import Config from "../config/config";

export default class HttpAdapter implements IHttp {
  private app: any;

  constructor(private readonly config: Config) {
    this.app = express();
    this.app.all("*", function (req: any, res: any, next: any) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "PATCH, PUT, GET, POST, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
      next();
    });
    this.app.use(express.json());
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        const result = await fn(req.params, req.body);
        res.json(result);
      } catch (error: any) {
        res.status(HttpStatus.InternalServerError).json(error.message);
      }
    });
  }

  listen(): void {
    this.app.listen(this.config.API_PORT, () => console.log('API is running on ' + this.config.API_URL));
  }
}