-- AlterTable
ALTER TABLE "Article"
    ADD COLUMN "authorId" INTEGER;

-- CreateTable
CREATE TABLE "User"
(
    "id"       SERIAL NOT NULL,
    "email"    TEXT   NOT NULL,
    "username" TEXT   NOT NULL,
    "password" TEXT   NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- AddForeignKey
ALTER TABLE "Article"
    ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
