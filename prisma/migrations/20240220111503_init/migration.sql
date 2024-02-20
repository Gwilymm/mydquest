-- CreateTable
CREATE TABLE "Enigma" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hints" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enigma_pkey" PRIMARY KEY ("id")
);
