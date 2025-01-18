import "dotenv/config";

import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

import { Environment } from "vitest/environments";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide a DATABASE_URL environment variable.");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: 'web',
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;
    console.log("URL:", process.env.DATABASE_URL);

    execSync("npx prisma migrate deploy"); // like writing command in your terminal

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
        await prisma.$disconnect();
      },
    };
  },
};
