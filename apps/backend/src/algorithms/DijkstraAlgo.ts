import MapNode from "./MapNode.ts";
import AlgoStrategyPattern from "./AlgoStrategyPattern.ts";

class DijkstraAlgo implements AlgoStrategyPattern {
  nodes: Map<string, MapNode> = new Map();
  noStair: boolean = true;

  findShortestPath(startNodeId: string, endNodeId: string): Array<string> {
    return this.dijkstra(startNodeId, endNodeId);
  }

  findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    const path = this.dijkstra(startNodeId, endNodeId);
    const map: Map<string, MapNode> = new Map();

    for (const nodeId of path) {
      const node = this.nodes.get(nodeId);

      if (node) {
        map.set(nodeId, node);
      }
    }

    return map;
  }

  public dijkstra(startNodeId: string, endNodeId: string): Array<string> {
    if (!this.nodes.has(startNodeId) || !this.nodes.has(endNodeId)) {
      return [];
    }

    const distance: Map<string, number> = new Map();
    const visited: Set<string> = new Set();
    const previous: Map<string, string | null> = new Map();

    // Initialize distances to infinity and previous nodes to null
    for (const nodeId of this.nodes.keys()) {
      distance.set(nodeId, Infinity);
      previous.set(nodeId, null);
    }

    distance.set(startNodeId, 0);

    while (visited.size < this.nodes.size) {
      const currentNodeId = this.getMinDistanceNode(distance, visited);
      visited.add(currentNodeId);

      if (currentNodeId === endNodeId) {
        // Reconstruct the path and return it
        return this.reconstructPath(previous, endNodeId);
      }

      const currentNode = this.nodes.get(currentNodeId)!;

      for (const neighborId of currentNode.neighbors) {
        const currentNode = this.nodes.get(currentNodeId)!;
        const neighborNode = this.nodes.get(neighborId)!;
        if (
          this.noStair &&
          currentNode.nodeType === "STAI" &&
          neighborNode.nodeType === "STAI"
        ) {
          continue; // Skip considering this path
        }
        if (!visited.has(neighborId)) {
          const distanceToNeighbor =
            distance.get(currentNodeId)! +
            this.distanceBetween(currentNodeId, neighborId);
          if (distanceToNeighbor < distance.get(neighborId)!) {
            distance.set(neighborId, distanceToNeighbor);
            previous.set(neighborId, currentNodeId);
          }
        }
      }
    }

    // If no path is found, return an empty array
    return [];
  }

  private getMinDistanceNode(
    distance: Map<string, number>,
    visited: Set<string>,
  ): string {
    let minNode: string | null = null;
    let minDistance: number = Infinity;

    for (const [nodeId, dist] of distance) {
      if (!visited.has(nodeId) && dist < minDistance) {
        minNode = nodeId;
        minDistance = dist;
      }
    }

    return minNode!;
  }

  private reconstructPath(
    previous: Map<string, string | null>,
    endNodeId: string,
  ): Array<string> {
    const path: Array<string> = [];
    let currentId: string | null = endNodeId;

    while (currentId !== null) {
      path.unshift(currentId);
      currentId = previous.get(currentId)!;
    }

    return path;
  }

  private distanceBetween(node1Id: string, node2Id: string): number {
    const node1 = this.nodes.get(node1Id)!;
    const node2 = this.nodes.get(node2Id)!;
    const dx = node1.xcoord - node2.xcoord;
    const dy = node1.ycoord - node2.ycoord;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export default DijkstraAlgo;
