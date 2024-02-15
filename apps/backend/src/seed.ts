import PrismaClient from "./bin/database-connection.ts";
import MapNode, { MapNodeNoNeighbors } from "./algorithms/MapNode.ts";
import MapEdge from "./algorithms/MapEdge.ts";

const nodesWithNeighbors: MapNode[] = MapNode.readCsv("csvFiles/nodes.csv");
const nodes: MapNodeNoNeighbors[] = MapNode.dropNeighbors(nodesWithNeighbors);

const edges: MapEdge[] = MapEdge.readCsv("csvFiles/edges.csv");
export default async function seed(): Promise<void> {
  await PrismaClient.mapEdge.deleteMany();
  await PrismaClient.mapNode.deleteMany();
  await PrismaClient.mapNode.createMany({ data: nodes });
  await PrismaClient.mapEdge.createMany({ data: edges });
}
