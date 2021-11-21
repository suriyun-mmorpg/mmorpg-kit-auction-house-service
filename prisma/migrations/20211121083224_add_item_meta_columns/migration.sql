/*
  Warnings:

  - You are about to drop the column `itemDataId` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemLevel` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemAmount` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemDurability` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemExp` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemLockRemainsDuration` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemExpireTime` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemRandomSeed` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `itemSockets` on the `auction` table. All the data in the column will be lost.
  - Added the required column `itemData` to the `auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auction` DROP COLUMN `itemDataId`,
    DROP COLUMN `itemLevel`,
    DROP COLUMN `itemAmount`,
    DROP COLUMN `itemDurability`,
    DROP COLUMN `itemExp`,
    DROP COLUMN `itemLockRemainsDuration`,
    DROP COLUMN `itemExpireTime`,
    DROP COLUMN `itemRandomSeed`,
    DROP COLUMN `itemSockets`,
    ADD COLUMN `itemData` TEXT NOT NULL,
    ADD COLUMN `metaName` VARCHAR(128) NOT NULL DEFAULT '',
    ADD COLUMN `metaLevel` INTEGER NOT NULL DEFAULT 0;
