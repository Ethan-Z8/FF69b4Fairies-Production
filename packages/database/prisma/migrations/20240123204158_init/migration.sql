-- CreateTable
CREATE TABLE "MapNode" (
    "nodeID" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "MapNode_pkey" PRIMARY KEY ("nodeID")
);

-- CreateTable
CREATE TABLE "MapEdge" (
    "edgeID" TEXT NOT NULL,
    "endNode" TEXT NOT NULL,

    CONSTRAINT "MapEdge_pkey" PRIMARY KEY ("edgeID")
);

-- AddForeignKey
ALTER TABLE "MapEdge" ADD CONSTRAINT "MapEdge_endNode_fkey" FOREIGN KEY ("endNode") REFERENCES "MapNode"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;
