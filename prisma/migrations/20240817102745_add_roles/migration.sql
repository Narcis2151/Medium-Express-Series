/*
  Warnings:

  - Made the column `authorId` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READER', 'WRITER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Article"
    DROP CONSTRAINT "Article_authorId_fkey";

-- AlterTable
ALTER TABLE "Article"
    ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User"
    ADD COLUMN "role" "Role" NOT NULL DEFAULT 'READER';

-- AddForeignKey
ALTER TABLE "Article"
    ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
