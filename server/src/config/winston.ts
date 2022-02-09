import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "logs";
const { combine, timestamp, printf, colorize, splat } = winston.format;

function logFormat() {
  return (info: any) => {
    return `[${info.level}]: ${info.timestamp} - ${info.message}`;
  };
}

export const logger = winston.createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), printf(logFormat())),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(splat(), colorize({ all: true, colors: { error: "blue" } })),
    })
  );
}

export class loggerStream {
  write(message: string) {
    logger.info(message);
  }
}
