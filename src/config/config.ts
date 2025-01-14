import "dotenv/config";

export const config = {
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT) || 5555,
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "123456",
  dbName: process.env.DB_NAME || "",
  apiKey: process.env.WEBHOSE_API_KEY || "",
};
