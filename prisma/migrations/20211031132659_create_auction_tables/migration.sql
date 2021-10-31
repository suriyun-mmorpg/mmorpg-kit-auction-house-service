-- CreateTable
CREATE TABLE `auction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buyoutPrice` INTEGER NOT NULL DEFAULT 0,
    `bidPrice` INTEGER NOT NULL DEFAULT 0,
    `startBidPrice` INTEGER NOT NULL DEFAULT 0,
    `sellerId` VARCHAR(50) NOT NULL DEFAULT '',
    `sellerName` VARCHAR(32) NOT NULL DEFAULT '',
    `isEnd` BOOLEAN NOT NULL DEFAULT false,
    `isBuyout` BOOLEAN NOT NULL DEFAULT false,
    `buyerId` VARCHAR(50) NOT NULL DEFAULT '',
    `buyerName` VARCHAR(32) NOT NULL DEFAULT '',
    `itemDataId` INTEGER NOT NULL DEFAULT 0,
    `itemLevel` INTEGER NOT NULL DEFAULT 1,
    `itemAmount` INTEGER NOT NULL DEFAULT 0,
    `itemDurability` DOUBLE NOT NULL DEFAULT 0,
    `itemExp` INTEGER NOT NULL DEFAULT 0,
    `itemLockRemainsDuration` DOUBLE NOT NULL DEFAULT 0,
    `itemExpireTime` BIGINT NOT NULL DEFAULT 0,
    `itemRandomSeed` INTEGER NOT NULL DEFAULT 0,
    `itemSockets` VARCHAR(32) NOT NULL DEFAULT '',
    `endedAt` DATETIME(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auction_bid_logs` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `auctionId` INTEGER NOT NULL,
    `buyerId` VARCHAR(50) NOT NULL DEFAULT '',
    `buyerName` VARCHAR(32) NOT NULL DEFAULT '',
    `bidPrice` INTEGER NOT NULL DEFAULT 0,
    `isBuyout` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
