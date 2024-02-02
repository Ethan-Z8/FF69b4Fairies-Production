-- AlterTable
ALTER TABLE "HighScore" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "HighScore_id_seq";

-- AlterTable
ALTER TABLE "ServiceRequest" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "ServiceRequest_id_seq";
