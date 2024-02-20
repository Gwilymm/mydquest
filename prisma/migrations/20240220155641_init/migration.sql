/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "UserEnigmas" (
    "userId" INTEGER NOT NULL,
    "enigmaId" INTEGER NOT NULL,

    CONSTRAINT "UserEnigmas_pkey" PRIMARY KEY ("userId","enigmaId")
);

-- AddForeignKey
ALTER TABLE "UserEnigmas" ADD CONSTRAINT "UserEnigmas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEnigmas" ADD CONSTRAINT "UserEnigmas_enigmaId_fkey" FOREIGN KEY ("enigmaId") REFERENCES "Enigma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
