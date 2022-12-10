# mmorpg-kit-auction-house-service
Auction house service for MMORPG KIT

## Requirement
- You have to install Node.js (I hope I won't have to tell you how)

## Install
- Clone this repo
- `npm i`

## Generate Prisma Clients
- `npx prisma generate --schema "./prisma/auctionSchema.prisma"`
- `npx prisma generate --schema "./prisma/mailSchema.prisma"`

## Configs
- Copy `.env.example`
- Rename copied file to `.env`
- Open `.env` and changes configs
- Open `auction-conf.json` and changes configs

## Database Connection Configs
Auction database's provider is MySQL, so you have to prepare MySQL server, also have to create empty database which will be filled with tables later, then set connection string config `AUCTION_DATABASE_URL`, you can see info about connection string from [this link](https://www.prisma.io/docs/concepts/database-connectors/mysql).
- `AUCTION_DATABASE_URL` is connection string to connect to auction database.
- `MAIL_DATABASE_URL` is connection string to connect to MMORPG KIT database.

## Auction Database Creation
After you set `AUCTION_DATABASE_URL` properly, then you have to push tables by uses command `npx prisma db push --schema "./prisma/auctionSchema.prisma"` (You won't have to push mail schema because it is part of MMORPG KIT, just have to set `MAIL_DATABASE_URL`)

## Build and Start
```
npm run build
npm run start
```

## Want to use SQLite?
Try change schema.prisma -> datasource db to use SQLite, learn about it [here](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
