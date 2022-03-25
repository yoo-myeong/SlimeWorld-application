import { App } from "./app";
import { logger } from "./config/winston";

try {
  const app = new App();
  app.startServer(4200);
} catch (e) {
  logger.error(e);
}
