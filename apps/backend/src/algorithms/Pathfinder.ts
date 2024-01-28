import MapNode from "./MapNode.ts";
import MapEdge from "./MapEdge.ts";
import { PathOrFileDescriptor } from "fs";
export default class Pathfinder {
  #nodes: Map<string, MapNode>;

  /**
   * constructs the object to contain all the nodes
   * @param NodesFileNames an array of PathOrFileDescriptors that are the names of all CSV node files it takes
   * @param EdgesFileNames an array of PathOrFileDescriptors that are the names of all CSV edge files it takes
   */
  public constructor(
    NodesFileNames: Array<PathOrFileDescriptor>,
    EdgesFileNames: Array<PathOrFileDescriptor>,
  ) {
    const nodes: Array<MapNode> = MapNode.readCsv(NodesFileNames[0]);
    const edges: Array<MapEdge> = MapEdge.readCsv(EdgesFileNames[0]);
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
}
