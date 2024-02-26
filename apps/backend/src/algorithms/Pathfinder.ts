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
  public constructor(
    nodes: MapNodeNoNeighbors[],
    edges: MapEdge[],
    strategyPattern?: AlgoStrategyPattern,
    noStair?: boolean,
  ) {
    this.#nodes = MapNode.connectNodes(nodes, edges);
    if (strategyPattern) {
      this.pattern = strategyPattern;
    } else {
      this.pattern = new AStarAlgo();
    }
    if (noStair) {
      this.pattern.noStair = noStair;
    } else {
      this.pattern.noStair = false;
    }
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
    this.pattern.nodes = this.#nodes;
    return this.pattern.findShortestPath(startNodeId, endNodeId);
  }
  public findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    this.pattern.nodes = this.#nodes;
    return this.pattern.findShortestPathNodes(startNodeId, endNodeId);
  }

  public findNearestType(startNodeID: string, type: string): string | null {
    const aStar = new AStarAlgo();
    aStar.nodes = this.#nodes;
    return aStar.findNearestNodeType(startNodeID, type);
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
  public generateDirections(StartNodeId: string, EndNodeId: string): string[] {
    const directions: string[] = [];
    const path = this.findShortestPath(StartNodeId, EndNodeId);
    if (path.length <= 1) {
      return directions;
    }

    let currentAngle = 0;
    //const forwardDistance = 0;

    for (let i = 1; i < path.length; i++) {
      const currentNode = this.getNodeByID(path[i]);
      const prevNode = this.getNodeByID(path[i - 1]);

      if (currentNode && prevNode) {
        if (
          currentNode.nodeType === "STAI" ||
          currentNode.nodeType === "ELEV"
        ) {
          if (prevNode.nodeType === "STAI" || prevNode.nodeType === "ELEV") {
            if (currentNode.nodeType === "STAI") {
              directions.push("USE the stairs to get to " + currentNode.floor);
            } else {
              directions.push(
                "USE the elevator to get to " + currentNode.floor,
              );
            }
          }
        } else {
          const deltaX = currentNode.xcoord - prevNode.xcoord;
          const deltaY = currentNode.ycoord - prevNode.ycoord;
          const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
          let turnAngle = angle - currentAngle;

          if (turnAngle > 180) {
            turnAngle -= 360;
          } else if (turnAngle < -180) {
            turnAngle += 360;
          }

          if (Math.abs(turnAngle) > 1) {
            directions.push(
              `Turn ${turnAngle > 0 ? "right" : "left"} at ${currentNode.shortName}`,
            );
          }

          // forwardDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          directions.push(`Move forward to ${currentNode.shortName}`);

          currentAngle = angle;
        }
      }
    }
    return directions;
  }
}
