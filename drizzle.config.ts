import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schemas/*",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "durable-sqlite",
} as unknown as Config;
