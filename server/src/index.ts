import { App } from "./app";
import { config } from "./config/config";
import { logger } from "./config/winston";

try {
    const app = new App();
    app.setExpress();
    app.startServer(config.port);
} catch (e) {
    logger.error(e);
}
