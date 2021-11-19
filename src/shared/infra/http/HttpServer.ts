import IHttp from "./IHttp";
import HttpStatus from "./HttpStatus";
import express from "express";
import Config from "../config/config";
import HttpError from "./HttpError";

export default class HttpServer implements IHttp {
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

  on(url: string, method: string, successStatusCode: number, fn: any): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        const result = await fn(req.params, req.body);
        res.status(successStatusCode).json(result);
      } catch (error: any) {
        if (error instanceof HttpError)
          res.status(error.errorStatusCode).json(error.message);
        else
          res.status(HttpStatus.InternalServerError).json(error.message);
      }
    });
  }

  listen(): void {
    this.app.listen(this.config.API_PORT, () => console.log('API is running on ' + this.config.API_URL));
  }
}