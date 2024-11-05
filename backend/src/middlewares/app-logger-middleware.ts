import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    if (method == "OPTIONS") return next();

    this.logger.log(`Incoming Request: ${method} ${originalUrl}`);

    res.on("finish", () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      this.logger.log(
        `Outgoing Response: ${method} ${originalUrl} - ${statusCode} - ${responseTime}ms`,
      );
    });

    next();
  }
}
