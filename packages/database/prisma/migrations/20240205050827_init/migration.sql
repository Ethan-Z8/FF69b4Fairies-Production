/*
  Warnings:

  - A unique constraint covering the columns `[displayName]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_displayName_key" ON "Employee"("displayName");

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_employeeName_fkey" FOREIGN KEY ("employeeName") REFERENCES "Employee"("displayName") ON DELETE RESTRICT ON UPDATE CASCADE;
