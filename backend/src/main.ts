import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { BigIntSerializationInterceptor } from "./common/interceptors/bigint-serialization.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger("Bootstrap");

  // Apply BigInt serialization interceptor
  app.useGlobalInterceptors(new BigIntSerializationInterceptor());
  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // CORS
  app.enableCors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    origin:
      configService.get<string>("FRONTEND_URL") ?? "http://localhost:3000",
  });

  // Security
  app.use(helmet());

  // Compression
  app.use(compression());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("League Insights")
    .setDescription("League Insights API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Start server
  const port = configService.get<number>("PORT") ?? 4000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);

  // Graceful shutdown
  const signals = ["SIGTERM", "SIGINT"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      logger.log(`Received ${signal}, closing server...`);
      await app.close();
      logger.log("Server closed");
      process.exit(0);
    });
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start the application", err);
  process.exit(1);
});
