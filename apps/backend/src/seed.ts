import PrismaClient from "./bin/database-connection.ts";
import MapNode, { MapNodeNoNeighbors } from "./algorithms/MapNode.ts";
import MapEdge from "./algorithms/MapEdge.ts";

const nodesWithNeighbors: MapNode[] = MapNode.readCsv("csvFiles/L1Nodes.csv");
const nodes: MapNodeNoNeighbors[] = MapNode.dropNeighbors(nodesWithNeighbors);

const edges: MapEdge[] = MapEdge.readCsv("csvFiles/L1Edges.csv");
const moreNodes = MapNode.readCsv("csvFiles/L1Nodes.csv");
export const initialGraph = MapNode.connectNodes(moreNodes, edges);
export default async function seed(): Promise<void> {
  await PrismaClient.mapEdge.deleteMany();
  await PrismaClient.mapNode.deleteMany();
  await PrismaClient.mapNode.createMany({ data: nodes });
  await PrismaClient.mapEdge.createMany({ data: edges });
}
