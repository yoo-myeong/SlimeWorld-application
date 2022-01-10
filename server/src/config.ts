import dotenv from "dotenv";
dotenv.config();

function required<T>(key: string, defaultValue?: any): T {
  const value: T = process.env[key] || defaultValue;
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
};
