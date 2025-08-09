import type { Config } from "drizzle-kit"
export default {
    schema: "./src/database/schemas/*",
    out: "./drizzle/migrations",
    dialect: "sqlite",
    driver: "expo",
}   satisfies Config