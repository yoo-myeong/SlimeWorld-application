import { getRepository } from "typeorm";
import { User } from "./entity/users/users.entity";
import { SlimeController } from "./controller/slime/slime.controller";
import "reflect-metadata";
import morgan from "morgan";
import { Container } from "typeorm-typedi-extensions";
import session from "express-session";
import express, { Express } from "express";
import { Server } from "http";
import { useExpressServer, useContainer, Action } from "routing-controllers";
import { sessionOption } from "./utils/session";
import { config } from "./config/config";
import { logger, loggerStream } from "./config/winston";
import { connectDatabase } from "./config/database";
import { UsersController } from "./controller/users/users.controller";
import passport from "passport";
import bodyParser from "body-parser";

export class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.setDatabase();
        this.setMiddleware();
    }

    public startServer(port: number): Server {
        const server = this.app.listen(port, () => {
            logger.info(`server started on ${port}`);
        });
        return server;
    }

    public stopServer(server: Server): void {
        server.close();
    }

    /**
     * 세팅
     */
    public setExpress(): void {
        useContainer(Container);
        useExpressServer(this.app, {
            cors: {
                origin: config.cors.allowedOrigin,
                optionsSuccessStatus: 200,
                credentials: true,
            },
            controllers: [UsersController, SlimeController],
            authorizationChecker: (action: Action, roles: string[]) => {
                try {
                    const id = action.request.user.id;
                    const user = getRepository(User).findOne({ id });
                    if (!user) return false;
                    return true;
                } catch (e) {
                    return false;
                }
            },
        });
    }

    private async setDatabase(): Promise<void> {
        try {
            await connectDatabase();
        } catch (e) {
            logger.error(e);
        }
    }

    private setMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session(sessionOption));
        this.app.use(morgan("short", { stream: new loggerStream() }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
}
