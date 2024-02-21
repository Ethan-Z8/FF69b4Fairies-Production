import { test } from "vitest";
import MapNode from "../src/algorithms/MapNode.ts";
import MapEdge from "../src/algorithms/MapEdge.ts";
import Pathfinder from "../src/algorithms/Pathfinder.ts";

test("", () => {
  const nodes = MapNode.readCsv("csvFiles/nodes.csv");
  const edges = MapEdge.readCsv("csvFiles/edges.csv");
  const pathfinder = new Pathfinder(nodes, edges);
  //console.log(pathfinder.getNodes());
  console.log(pathfinder.generateDirections("ALABS001L2", "ALABS00203"));
});
