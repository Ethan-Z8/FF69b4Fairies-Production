import PrismaClient from "./bin/database-connection.ts";
import MapNode from "./algorithms/MapNode.ts";
import MapEdge from "./algorithms/MapEdge.ts";

const nodes: MapNode[] = MapNode.readCsv(
  `${__dirname}/../csvFiles/L1Nodes.csv`,
);
const edges: MapEdge[] = MapEdge.readCsv(
  `${__dirname}/../csvFiles/L1Edges.csv`,
);

export default async function seed(): Promise<void> {
  await PrismaClient.mapEdge.deleteMany();
  await PrismaClient.mapNode.deleteMany();
  await PrismaClient.mapNode.createMany({ data: nodes });
  await PrismaClient.mapEdge.createMany({ data: edges });
}
