/*
  Warnings:

  - The primary key for the `ServiceRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ServiceRequest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ServiceRequest` table. All the data in the column will be lost.
  - Added the required column `nodeLoc` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeService` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nodeLoc" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "typeService" TEXT NOT NULL,
ADD CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("date");
