/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Enigma` will be added. If there are existing duplicate values, this will fail.
  - Made the column `qrCode` on table `Enigma` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Enigma" ALTER COLUMN "qrCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Enigma_qrCode_key" ON "Enigma"("qrCode");
