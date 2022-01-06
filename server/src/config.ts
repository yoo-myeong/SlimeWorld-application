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
};
