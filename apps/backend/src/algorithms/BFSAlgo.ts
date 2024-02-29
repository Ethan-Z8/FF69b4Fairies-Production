import MapNode from "./MapNode.ts";
import AlgoStrategyPattern from "./AlgoStrategyPattern.ts";
class BFSAlgo implements AlgoStrategyPattern {
  nodes: Map<string, MapNode> = new Map();
  noStair: boolean = true;

  findShortestPath(startNodeId: string, endNodeId: string): Array<string> {
    return this.BFS(startNodeId, endNodeId);
  }
  findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    const path = this.BFS(startNodeId, endNodeId);
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
   * BFS algorithim takes returns the shortest path of nodes to destination
   * @param startNodeId the initial node
   * @param endNodeId the destination node
   * @return an array of nodeId's that are the path it recommends if there is no path returns empty array
   */
  BFS(startNodeId: string, endNodeId: string): Array<string> {
    if (!this.nodes.has(startNodeId) || !this.nodes.has(endNodeId)) {
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
          this.nodes.get(currentNodeId)!.neighbors;

        for (const neighborNodeId of neighbors) {
          const currentNode = this.nodes.get(currentNodeId)!;
          const neighborNode = this.nodes.get(neighborNodeId)!;
          if (
            this.noStair &&
            currentNode.nodeType === "STAI" &&
            neighborNode.nodeType === "STAI"
          ) {
            continue; // Skip considering this path
          }
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
}
export default BFSAlgo;
