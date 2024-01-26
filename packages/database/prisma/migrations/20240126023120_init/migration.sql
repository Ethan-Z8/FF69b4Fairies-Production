-- CreateTable
CREATE TABLE "MapNode" (
    "nodeID" TEXT NOT NULL,
    "xcoord" DOUBLE PRECISION NOT NULL,
    "ycoord" DOUBLE PRECISION NOT NULL,
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
    "startNode" TEXT NOT NULL,
    "endNode" TEXT NOT NULL,

    CONSTRAINT "MapEdge_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MapEdge" ADD CONSTRAINT "MapEdge_startNode_fkey" FOREIGN KEY ("startNode") REFERENCES "MapNode"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapEdge" ADD CONSTRAINT "MapEdge_endNode_fkey" FOREIGN KEY ("endNode") REFERENCES "MapNode"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;
