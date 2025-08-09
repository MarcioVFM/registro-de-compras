import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const list = sqliteTable("list", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    value: text("value").notNull(),
    payday: text("payday").notNull(),
    expireday: text("expireday").notNull(),
    status: text("status").notNull(),
}) 