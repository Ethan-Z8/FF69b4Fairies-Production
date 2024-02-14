-- DropForeignKey
ALTER TABLE "FlowerRequest" DROP CONSTRAINT "FlowerRequest_id_fkey";

-- DropForeignKey
ALTER TABLE "MaintenanceRequest" DROP CONSTRAINT "MaintenanceRequest_id_fkey";

-- DropForeignKey
ALTER TABLE "ReligionRequest" DROP CONSTRAINT "ReligionRequest_id_fkey";

-- DropForeignKey
ALTER TABLE "SanitationRequest" DROP CONSTRAINT "SanitationRequest_id_fkey";

-- DropForeignKey
ALTER TABLE "TransportationRequest" DROP CONSTRAINT "TransportationRequest_id_fkey";

-- AddForeignKey
ALTER TABLE "SanitationRequest" ADD CONSTRAINT "SanitationRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportationRequest" ADD CONSTRAINT "TransportationRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerRequest" ADD CONSTRAINT "FlowerRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReligionRequest" ADD CONSTRAINT "ReligionRequest_id_fkey" FOREIGN KEY ("id") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
