import {
  mysqlTable,
  varchar,
  text,
  boolean,
  int,
  timestamp,
  longtext,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import type { AdapterAccount } from "next-auth/adapters";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date", fsp: 3 }),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const sessions = mysqlTable("session", {
  sessionToken: varchar("session_token", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const verificationTokens = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const skills = mysqlTable("skills", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  description: text("description"),
  version: varchar("version", { length: 32 }).notNull().default("1.0.0"),
  userInvocable: boolean("user_invocable").notNull().default(true),
  tags: text("tags"),
  compatiblePlatforms: text("compatible_platforms"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const flows = mysqlTable("flows", {
  id: varchar("id", { length: 36 }).primaryKey(),
  skillId: varchar("skill_id", { length: 36 }).notNull().unique(),
  version: int("version").notNull().default(1),
  nodesJson: text("nodes_json").notNull().default("[]"),
  edgesJson: text("edges_json").notNull().default("[]"),
  viewportJson: text("viewport_json").notNull().default('{"x":0,"y":0,"zoom":1}'),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

export const skillExports = mysqlTable("skill_exports", {
  id: varchar("id", { length: 36 }).primaryKey(),
  skillId: varchar("skill_id", { length: 36 }).notNull(),
  flowVersion: int("flow_version").notNull(),
  skillMdContent: longtext("skill_md_content").notNull(),
  generatedAt: timestamp("generated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  skills: many(skills),
  sessions: many(sessions),
  accounts: many(accounts),
}));

export const skillsRelations = relations(skills, ({ one, many }) => ({
  user: one(users, { fields: [skills.userId], references: [users.id] }),
  flow: one(flows, { fields: [skills.id], references: [flows.skillId] }),
  exports: many(skillExports),
}));

export const flowsRelations = relations(flows, ({ one }) => ({
  skill: one(skills, { fields: [flows.skillId], references: [skills.id] }),
}));

export const skillExportsRelations = relations(skillExports, ({ one }) => ({
  skill: one(skills, { fields: [skillExports.skillId], references: [skills.id] }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type Flow = typeof flows.$inferSelect;
export type NewFlow = typeof flows.$inferInsert;
export type SkillExport = typeof skillExports.$inferSelect;
