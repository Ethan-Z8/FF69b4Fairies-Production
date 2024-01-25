/*
  Warnings:

  - Added the required column `startNode` to the `MapEdge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MapEdge" ADD COLUMN     "startNode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MapEdge" ADD CONSTRAINT "MapEdge_startNode_fkey" FOREIGN KEY ("startNode") REFERENCES "MapNode"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;
