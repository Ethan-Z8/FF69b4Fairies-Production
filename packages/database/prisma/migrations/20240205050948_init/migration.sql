/*
  Warnings:

  - Changed the type of `progress` on the `ServiceRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('Assigned', 'InProgress', 'Completed');

-- AlterTable
ALTER TABLE "ServiceRequest" DROP COLUMN "progress",
ADD COLUMN     "progress" "Progress" NOT NULL;
