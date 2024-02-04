import MapNode, { MapNodeNoNeighbors } from "./MapNode.ts";
import MapEdge from "./MapEdge.ts";

export default class Pathfinder {
  #nodes: Map<string, MapNode>;

  /**
   * constructs the object to contain all the nodes
   * @param NodesFileNames an array of PathOrFileDescriptors that are the names of all CSV node files it takes
   * @param EdgesFileNames an array of PathOrFileDescriptors that are the names of all CSV edge files it takes
   */
  public constructor(nodes: MapNodeNoNeighbors[], edges: MapEdge[]) {
    this.#nodes = MapNode.connectNodes(nodes, edges);
  }

  public findShortestPath(
    startNodeId: string,
    endNodeId: string,
  ): Array<string> {
    if (!this.#nodes.has(startNodeId) || !this.#nodes.has(endNodeId)) {
      return [];
    }

    const visited: Set<string> = new Set();
    const queue: Array<Array<string>> = [[startNodeId]];

    while (queue.length > 0) {
      const path: Array<string> = queue.shift()!; // Get the first path in the queue
      const currentNodeId: string = path[path.length - 1];

      if (currentNodeId === endNodeId) {
        // If we have reached the target node, return the path
        return path;
      }

      if (!visited.has(currentNodeId)) {
        // If the current node has not been visited yet
        visited.add(currentNodeId);

        const neighbors: Array<string> =
          this.#nodes.get(currentNodeId)!.neighbors;

        for (const neighborNodeId of neighbors) {
          if (!visited.has(neighborNodeId)) {
            // Create a new path by extending the current path
            const newPath: Array<string> = [...path, neighborNodeId];
            queue.push(newPath);
          }
        }
      }
    }

    // If no path is found, return an empty array
    return [];
  }

  public findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    const path = this.Astar(startNodeId, endNodeId);
    const map: Map<string, MapNode> = new Map();

    for (const nodeId of path) {
      const node = this.#nodes.get(nodeId);

      if (node) {
        map.set(nodeId, node);
      }
    }

    return map;
  }

  public getNodes(): Map<string, MapNode> {
    return this.#nodes;
  }

  public Astar(startNodeId: string, endNodeId: string): Array<string> {
    if (!this.#nodes.has(startNodeId) || !this.#nodes.has(endNodeId)) {
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

      const currentNode = this.#nodes.get(currentId)!;

      for (const neighborId of currentNode.neighbors) {
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
  private heuristic(node1Id: string, node2Id: string): number {
    return this.distanceBetween(node1Id, node2Id);
  }
  private distanceBetween(node1Id: string, node2Id: string): number {
    const node1 = this.#nodes.get(node1Id)!;
    const node2 = this.#nodes.get(node2Id)!;
    const dx = node1.xcoord - node2.xcoord;
    const dy = node1.ycoord - node2.ycoord;
    return Math.sqrt(dx * dx + dy * dy);
  }
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
