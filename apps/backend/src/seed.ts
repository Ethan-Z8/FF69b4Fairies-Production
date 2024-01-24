import PrismaClient from "./bin/database-connection.ts";
import MapNode from "./algorithms/MapNode.ts";
import MapEdge from "./algorithms/MapEdge.ts";

type MapNodeNoNeighbors = Omit<MapNode, "neighbors">;
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
console.log(MapNode.connectNodes(moreNodes, edges));
export default async function seed(): Promise<void> {
  await PrismaClient.mapEdge.deleteMany();
  await PrismaClient.mapNode.deleteMany();
  await PrismaClient.mapNode.createMany({ data: nodes });
  await PrismaClient.mapEdge.createMany({ data: edges });
}

PrismaClient.highScore
  .create({
    data: {
      time: new Date().toISOString(),
      score: 120,
    },
  })
  .catch((err) => {
    console.log(`Couldn't log due to ${err}`);
  });
