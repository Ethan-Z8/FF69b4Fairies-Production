/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ServiceRequest" DROP CONSTRAINT "ServiceRequest_employee_fkey";

-- DropIndex
DROP INDEX "Employee_displayName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_employee_fkey" FOREIGN KEY ("employee") REFERENCES "Employee"("username") ON DELETE CASCADE ON UPDATE CASCADE;
