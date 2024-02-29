import MapNode from "./MapNode.ts";
interface AlgoStrategyPattern {
  noStair: boolean;
  nodes: Map<string, MapNode>;
  findShortestPathNodes: (
    startNodeId: string,
    endNodeId: string,
  ) => Map<string, MapNode>;
  findShortestPath: (startNodeId: string, endNodeId: string) => Array<string>;
}
export default AlgoStrategyPattern;
