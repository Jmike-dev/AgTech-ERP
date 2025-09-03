/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Crops` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Farmer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Admin";

-- DropTable
DROP TABLE "public"."Crops";

-- DropTable
DROP TABLE "public"."Farmer";

-- CreateTable
CREATE TABLE "public"."admins" (
    "adminId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "public"."farmers" (
    "farmerId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" TEXT,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "farmers_pkey" PRIMARY KEY ("farmerId")
);

-- CreateTable
CREATE TABLE "public"."crops" (
    "cropId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "farmerId" TEXT NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("cropId")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "farmers_email_key" ON "public"."farmers"("email");

-- AddForeignKey
ALTER TABLE "public"."farmers" ADD CONSTRAINT "farmers_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."admins"("adminId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."crops" ADD CONSTRAINT "crops_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "public"."farmers"("farmerId") ON DELETE CASCADE ON UPDATE CASCADE;
