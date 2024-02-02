import { expect, test } from "vitest";
import MapNode from "../src/algorithms/MapNode.ts";
import MapEdge from "../src/algorithms/MapEdge.ts";
import Pathfinder from "../src/algorithms/Pathfinder.ts";

function sum(a: number, b: number): number {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("testing non existent IDS", () => {
  const nodes: MapNode[] = MapNode.readCsv("../backend/csvFiles/L1Nodes.csv");
  const edges: MapEdge[] = MapEdge.readCsv("../backend/csvFiles/L1Edges.csv");
  const pathfinder: Pathfinder = new Pathfinder(nodes, edges);
  const expectedOutput: Array<string> = [];
  expect(pathfinder.findShortestPath("err", "err")).toEqual(expectedOutput);
});
test("testing same path", () => {
  const nodes: MapNode[] = MapNode.readCsv("../backend/csvFiles/L1Nodes.csv");
  const edges: MapEdge[] = MapEdge.readCsv("../backend/csvFiles/L1Edges.csv");
  const pathfinder: Pathfinder = new Pathfinder(nodes, edges);
  const expectedOutput: Array<string> = ["CCONF002L1"];
  expect(pathfinder.findShortestPath("CCONF002L1", "CCONF002L1")).toEqual(
    expectedOutput,
  );
});
test("testing edges", () => {
  const nodes: MapNode[] = MapNode.readCsv("../backend/csvFiles/L1Nodes.csv");
  const edges: MapEdge[] = MapEdge.readCsv("../backend/csvFiles/L1Edges.csv");
  const pathfinder: Pathfinder = new Pathfinder(nodes, edges);
  const expectedOutput: Array<string> = ["CCONF002L1", "WELEV00HL1"];
  expect(pathfinder.findShortestPath("CCONF002L1", "WELEV00HL1")).toEqual(
    expectedOutput,
  );
});
test("testing valid", () => {
  const nodes: MapNode[] = MapNode.readCsv("../backend/csvFiles/L1Nodes.csv");
  const edges: MapEdge[] = MapEdge.readCsv("../backend/csvFiles/L1Edges.csv");
  const pathfinder: Pathfinder = new Pathfinder(nodes, edges);
  const expectedOutput: Array<string> = [
    "CCONF002L1",
    "WELEV00HL1",
    "CHALL004L1",
    "CREST004L1",
    "CLABS005L1",
  ];
  expect(pathfinder.findShortestPath("CCONF002L1", "CLABS005L1")).toEqual(
    expectedOutput,
  );
});
