/*
  Warnings:

  - Added the required column `created_at` to the `UserToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_date` to the `UserToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usertoken` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `expires_date` DATETIME(3) NOT NULL,
    ADD COLUMN `refresh_token` VARCHAR(191) NOT NULL;
