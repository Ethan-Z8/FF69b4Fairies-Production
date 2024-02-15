import MapNode, { MapNodeNoNeighbors } from "./MapNode.ts";
import MapEdge from "./MapEdge.ts";
import AlgoStrategyPattern from "./AlgoStrategyPattern.ts";
import AStarAlgo from "./AStarAlgo.ts";
export default class Pathfinder {
  #nodes: Map<string, MapNode>;
  pattern: AlgoStrategyPattern;
  /**
   * Constructor
   * @param nodes Takes in an array of MapNodes with no neighbors
   * @param edges Takes in an array of MapEdge with neighbors
   */
  public constructor(nodes: MapNodeNoNeighbors[], edges: MapEdge[]) {
    this.#nodes = MapNode.connectNodes(nodes, edges);
    this.pattern = new AStarAlgo();
  }

  /**
   * returns the path it recommends to destination
   * @param startNodeId the initial node
   * @param endNodeId the destination node
   * @return a map<string, MapNode> of nodeId's that are the path it recommends if there is no path returns empty map
   */
  public findShortestPath(
    startNodeId: string,
    endNodeId: string,
  ): Array<string> {
    return this.pattern.findShortestPath(startNodeId, endNodeId);
  }
  public findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    this.pattern.nodes = this.#nodes;
    return this.pattern.findShortestPathNodes(startNodeId, endNodeId);
  }

  /**
   * @return the nodes that have been initilized
   */
  public getNodes(): Map<string, MapNode> {
    return this.#nodes;
  }

  public getNodeByID(id: string): MapNode | undefined {
    return this.#nodes.get(id);
  }

  public shortNameToID(shortname: string): string {
    for (const [id, node] of this.#nodes.entries()) {
      if (node.shortName === shortname) {
        return id;
      }
    }
    return "";
  }
}
