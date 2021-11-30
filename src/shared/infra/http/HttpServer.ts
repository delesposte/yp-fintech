import IHttp from "./IHttp";
import HttpStatus from "./HttpStatus";
import express from "express";
import Config from "../config/config";
import { BadRequestError, NotFoundError, UnauthorizedError, ForbiddenError } from "../../extend/Errors";

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
        const sucessResponse = await fn(req.params, req.body);
        res.status(successStatusCode).json(sucessResponse);
      } catch (error: any) {
        const errorResponse = { message: error.message };
        if (error instanceof BadRequestError)
          res.status(HttpStatus.BadRequest).json(errorResponse);
        else if (error instanceof NotFoundError)
          res.status(HttpStatus.NotFound).json(errorResponse);
        else if (error instanceof UnauthorizedError)
          res.status(HttpStatus.Unauthorized).json(errorResponse);
        else if (error instanceof ForbiddenError)
          res.status(HttpStatus.Forbidden).json(errorResponse);
        else
          res.status(HttpStatus.InternalServerError).json(errorResponse);
      }
    });
  }

  listen(): void {
    this.app.listen(this.config.API_PORT, () => console.log('API is running on ' + this.config.API_URL));
  }

}