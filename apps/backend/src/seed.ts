import PrismaClient from "./bin/database-connection.ts";
import MapNode, { MapNodeNoNeighbors } from "./algorithms/MapNode.ts";
import MapEdge from "./algorithms/MapEdge.ts";

const nodes: MapNodeNoNeighbors[] = MapNode.readCsv("csvFiles/L1Nodes.csv").map(
  (node: MapNode) => {
    // Can ignore this warning because we need to get the neighbors by name to omit them
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { neighbors, ...rest } = node;
    return rest;
  },
);

const edges: MapEdge[] = MapEdge.readCsv("csvFiles/L1Edges.csv");
const moreNodes = MapNode.readCsv("csvFiles/L1Nodes.csv");
export const initialGraph = MapNode.connectNodes(moreNodes, edges);
export default async function seed(): Promise<void> {
  await PrismaClient.mapEdge.deleteMany();
  await PrismaClient.mapNode.deleteMany();
  await PrismaClient.mapNode.createMany({ data: nodes });
  await PrismaClient.mapEdge.createMany({ data: edges });
}
