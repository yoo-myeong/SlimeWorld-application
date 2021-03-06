import mysql2 from "mysql2/promise";
import * as Session from "express-session";
import expressMySqlSession from "express-mysql2-session";
import { config } from "../config/config.js";

const connection = mysql2.createPool(config.db);
const MySQLStore = expressMySqlSession(Session);
const CrossOption = {
    sameSite: "none",
    secure: true,
};
const ProxyOption = config.nodeEnv === "DEV" ? undefined : true;
const cookieOption = config.nodeEnv === "DEV" ? {} : CrossOption;
const sessionStore = new MySQLStore({ checkExpirationInterval: 100000 }, connection);

export const sessionOption: Session.SessionOptions = {
    secret: config.session.secreatKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    proxy: ProxyOption,
    cookie: {
        httpOnly: true,
        maxAge: 3600000,
        ...cookieOption,
    },
};
