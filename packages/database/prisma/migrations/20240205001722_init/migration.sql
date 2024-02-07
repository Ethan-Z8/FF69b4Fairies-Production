/*
  Warnings:

  - Added the required column `employeeName` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "employeeName" TEXT NOT NULL,
ADD COLUMN     "progress" TEXT NOT NULL;
