/*
  Warnings:

  - The primary key for the `ServiceRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employeeName` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `nodeLoc` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `ServiceRequest` table. All the data in the column will be lost.
  - Added the required column `employee` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Low', 'Medium', 'High', 'Emergency');

-- AlterEnum
ALTER TYPE "Progress" ADD VALUE 'Unassigned';

-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_employeeName_fkey";

-- AlterTable
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_pkey",
DROP COLUMN "employeeName",
DROP COLUMN "nodeLoc",
DROP COLUMN "reason",
ADD COLUMN     "employee" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "priority" "Priority" NOT NULL,
ADD CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "SanitationRequest" (
    "id" INTEGER NOT NULL,
    "messDesc" TEXT NOT NULL,
    "hazardous" BOOLEAN NOT NULL,

    CONSTRAINT "SanitationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransportationRequest" (
    "id" INTEGER NOT NULL,
    "endLocation" TEXT NOT NULL,
    "equipmentNeeded" TEXT NOT NULL,

    CONSTRAINT "TransportationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" INTEGER NOT NULL,
    "personnelNeeded" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerRequest" (
    "id" INTEGER NOT NULL,
    "flowerType" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,

    CONSTRAINT "FlowerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReligionRequest" (
    "id" INTEGER NOT NULL,
    "religionType" TEXT NOT NULL,
    "typeOfService" TEXT NOT NULL,

    CONSTRAINT "ReligionRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_employee_fkey" FOREIGN KEY ("employee") REFERENCES "Employee"("displayName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SanitationRequest" ADD CONSTRAINT "SanitationRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportationRequest" ADD CONSTRAINT "TransportationRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerRequest" ADD CONSTRAINT "FlowerRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReligionRequest" ADD CONSTRAINT "ReligionRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
