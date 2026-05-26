import "dotenv/config";
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/auctionSchema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("AUCTION_DATABASE_URL"),
  },
});