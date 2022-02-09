import dotenv from "dotenv";
dotenv.config();

function required(key: string, defaultValue?: any): string {
  const value: string = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error("key is undefined");
  }
  return value;
}

export const config = {
  bcrypt: {
    saltRounds: parseInt(required("SALTROUNDS")),
  },
  db: {
    host: required("DB_HOST") as string,
    port: parseInt(required("DB_PORT")) as number,
    user: required("DB_USER") as string,
    password: required("DB_PASSWORD") as string,
    database: required("DB_DATABASE") as string,
  },
  session: {
    secreatKey: required("SESSION_SECREAT_KEY") as string,
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN") as string,
  },
  aws: {
    s3: {
      accessKeyId: required("S3_ACCESS_KEY_ID") as string,
      secretAccessKey: required("S3_SECRET_ACCESS_KEY") as string,
    },
  },
  typeorm: {
    type: required("TYPEORM_TYPE") as "mysql",
    host: required("TYPEORM_HOST"),
    port: required("TYPEORM_PORT"),
    username: required("TYPEORM_USERNAME"),
    password: required("TYPEORM_PASSWORD"),
    database: required("TYPEORM_DATABASE"),
    synchronize: true,
    logging: ["query"],
    entities: ["dist/entity/**/*.{js,ts}"],
    migrations: ["dist/migration/**/*.{js,ts}"],
    subscribers: ["dist/subscriber/**/*.{js,ts}"],
  },
  nodeEnv: required("NODE_ENV"),
};