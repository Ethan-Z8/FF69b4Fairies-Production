import MapNode from "./MapNode.ts";
import AlgoStrategyPattern from "./AlgoStrategyPattern.ts";

class AStarAlgo implements AlgoStrategyPattern {
  nodes: Map<string, MapNode> = new Map();
  noStair: boolean = true;
  findShortestPath(startNodeId: string, endNodeId: string): Array<string> {
    return this.Astar(startNodeId, endNodeId);
  }

  findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    const path = this.Astar(startNodeId, endNodeId);
    const map: Map<string, MapNode> = new Map();

    for (const nodeId of path) {
      const node = this.nodes.get(nodeId);

      if (node) {
        map.set(nodeId, node);
      }
    }

    return map;
  }

  /**
   * A* Algorithm
   * returns the path it recommends to destination
   * @param startNodeId the initial node
   * @param endNodeId the destination node
   * @return a Array<string> of nodeId's that are the path it recommends if there is no path returns []
   */
  public Astar(startNodeId: string, endNodeId: string): Array<string> {
    if (!this.nodes.has(startNodeId) || !this.nodes.has(endNodeId)) {
      return [];
    }
    const openSet: Map<string, number> = new Map();
    const cameFrom: Map<string, string | null> = new Map();
    const gScore: Map<string, number> = new Map();
    const fScore: Map<string, number> = new Map();
    openSet.set(startNodeId, 0);
    gScore.set(startNodeId, 0);
    fScore.set(startNodeId, this.heuristic(startNodeId, endNodeId));
    while (openSet.size > 0) {
      const currentId = this.getMinFScoreNode(openSet);
      openSet.delete(currentId);

      if (currentId === endNodeId) {
        // Reconstruct the path and return it
        return this.reconstructPath(cameFrom, currentId);
      }

      const currentNode = this.nodes.get(currentId)!;

      for (const neighborId of currentNode.neighbors) {
        const neighborNode = this.nodes.get(neighborId);
        if (
          neighborNode &&
          currentNode.nodeType === "STAI" &&
          neighborNode.nodeType === "STAI" &&
          this.noStair
        ) {
          continue;
        }
        const tentativeGScore =
          gScore.get(currentId)! + this.distanceBetween(currentId, neighborId);

        if (
          !gScore.has(neighborId) ||
          tentativeGScore < gScore.get(neighborId)!
        ) {
          cameFrom.set(neighborId, currentId);
          gScore.set(neighborId, tentativeGScore);
          fScore.set(
            neighborId,
            gScore.get(neighborId)! + this.heuristic(neighborId, endNodeId),
          );

          if (!openSet.has(neighborId)) {
            openSet.set(neighborId, fScore.get(neighborId)!);
          }
        }
      }
    }

    // If no path is found, return an empty array
    return [];
  }

  public findNearestNodeType(
    startNodeId: string,
    nodeType: string,
  ): string | null {
    if (!this.nodes.has(startNodeId)) {
      return null;
    }

    const openSet: Set<string> = new Set();
    const cameFrom: Map<string, string | null> = new Map();
    const gScore: Map<string, number> = new Map();
    const fScore: Map<string, number> = new Map();
    openSet.add(startNodeId);
    gScore.set(startNodeId, 0);
    fScore.set(startNodeId, 0);

    let closestNodeId: string | null = null;
    let closestDistance: number = Number.POSITIVE_INFINITY;

    while (openSet.size > 0) {
      let currentId: string | null = null;
      let minFScore: number = Number.POSITIVE_INFINITY;
      for (const nodeId of openSet) {
        const f = gScore.get(nodeId)!;
        if (f < minFScore) {
          minFScore = f;
          currentId = nodeId;
        }
      }
      if (!currentId) break;

      openSet.delete(currentId);

      const currentNode = this.nodes.get(currentId)!;

      if (currentNode.nodeType === nodeType) {
        const distance = this.distanceBetween(startNodeId, currentId);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNodeId = currentId;
        }
      }

      for (const neighborId of currentNode.neighbors) {
        if (!this.nodes.has(neighborId)) continue;
        const tentativeGScore =
          gScore.get(currentId)! + this.distanceBetween(currentId, neighborId);

        if (
          !gScore.has(neighborId) ||
          tentativeGScore < gScore.get(neighborId)!
        ) {
          cameFrom.set(neighborId, currentId);
          gScore.set(neighborId, tentativeGScore);
          openSet.add(neighborId);
        }
      }
    }

    return closestNodeId;
  }

  /**
   * the heuristic weight between two nodes
   * @param node1Id the first node
   * @param node2Id the second node
   * @return number representing the weight of path
   * @private
   */
  private heuristic(node1Id: string, node2Id: string): number {
    const node1: MapNode = this.nodes.get(node1Id)!;
    const node2: MapNode = this.nodes.get(node2Id)!;
    if (node1.floor !== node2.floor) {
      if (node1.nodeType == "ELEV" && node2.nodeType == "ELEV") {
        return 0;
      } else {
        return Number.POSITIVE_INFINITY;
      }
    }

    return this.distanceBetween(node1Id, node2Id);
  }

  /**
   * gets the distance between two nodes
   * @param node1Id the first node
   * @param node2Id the second node
   * @return the distance between the two nodes
   * @private
   */
  private distanceBetween(node1Id: string, node2Id: string): number {
    const node1 = this.nodes.get(node1Id)!;
    const node2 = this.nodes.get(node2Id)!;
    if (
      node1.floor !== node2.floor &&
      node1.nodeType == "ELEV" &&
      node2.nodeType == "ELEV"
    ) {
      return 0;
    }
    const dx = node1.xcoord - node2.xcoord;
    const dy = node1.ycoord - node2.ycoord;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * gets the smallest FScore
   * @param openSet
   * @private
   */
  private getMinFScoreNode(
    openSet: Map<string, number>,
    //fScore: Map<string, number>,
  ): string {
    let minNode: string | null = null;
    let minFScore: number | null = null;

    for (const [nodeId, score] of openSet) {
      if (minFScore === null || score < minFScore) {
        minNode = nodeId;
        minFScore = score;
      }
    }

    return minNode!;
  }

  /**
   * finds the shortest path between start node and target node
   * @param cameFrom maps each node to its predecessor
   * @param currentId the target node
   * @return Array<string> the shortest path to destination
   * @private
   */
  private reconstructPath(
    cameFrom: Map<string, string | null>,
    currentId: string,
  ): Array<string> {
    const path: Array<string> = [currentId];

    while (cameFrom.has(currentId) && cameFrom.get(currentId) !== null) {
      currentId = cameFrom.get(currentId)!;
      path.unshift(currentId);
    }

    return path;
  }
}

export default AStarAlgo;
