import { varchar, uuid, text, pgTable, pgEnum, date, timestamp, integer, numeric } from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const users = pgTable("users", {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    username: varchar("user_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    role: ROLE_ENUM("role").default("USER"),
    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true, }).defaultNow(),
});

export const books = pgTable("books", {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    genre: text("genre").notNull(),
    year: integer("year").notNull(),
    rating: numeric("rating").notNull(),
    coverUrl: text("cover_url").notNull(),
    fileUrl: text("file_url").notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    bookId: uuid("book_id").references(() => books.id).notNull(),
    borrowDate: timestamp("borrow_date", { withTimezone: true }).defaultNow().notNull(),
    dueDate: date("due_date").notNull(),
    returnDate: date("return_date"),
    status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});