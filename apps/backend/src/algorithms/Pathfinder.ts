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
    if (!this.#nodes.has(startNodeId) || !this.#nodes.has(endNodeId)) {
      return new Map();
    }

    const visited: Set<string> = new Set();
    const resultPath: Map<string, MapNode> = new Map();
    const queue: Array<Array<MapNode>> = [[this.#nodes.get(startNodeId)!]];

    while (queue.length > 0) {
      const path: Array<MapNode> = queue.shift()!; // Get the first path in the queue
      const currentNode: MapNode = path[path.length - 1];

      if (currentNode.nodeID === endNodeId) {
        // If we have reached the target node, populate the resultPath and return
        for (const node of path) {
          resultPath.set(node.nodeID, node);
        }
        return resultPath;
      }

      if (!visited.has(currentNode.nodeID)) {
        // If the current node has not been visited yet
        visited.add(currentNode.nodeID);

        const neighbors: Array<string> = currentNode.neighbors;

        for (const neighborNodeId of neighbors) {
          if (!visited.has(neighborNodeId)) {
            // Create a new path by extending the current path
            const neighborNode: MapNode = this.#nodes.get(neighborNodeId)!;
            const newPath: Array<MapNode> = [...path, neighborNode];
            queue.push(newPath);
          }
        }
      }
    }

    // If no path is found, return an empty Map
    return new Map();
  }

  public getNodes(): Map<string, MapNode> {
    return this.#nodes;
  }
}
