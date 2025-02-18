/*
  Warnings:

  - You are about to drop the column `locale` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "locale",
DROP COLUMN "remember_token",
DROP COLUMN "token";
