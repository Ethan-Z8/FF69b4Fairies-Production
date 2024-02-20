import MapNode from "./MapNode.ts";
import AlgoStrategyPattern from "./AlgoStrategyPattern.ts";

class DFSAlgo implements AlgoStrategyPattern {
  nodes: Map<string, MapNode> = new Map();

  findShortestPath(startNodeId: string, endNodeId: string): Array<string> {
    // For DFS, there's no concept of "shortest path", so just return the path found by DFS
    return this.dfs(startNodeId, endNodeId);
  }

  findShortestPathNodes(
    startNodeId: string,
    endNodeId: string,
  ): Map<string, MapNode> {
    const path = this.dfs(startNodeId, endNodeId);
    const map: Map<string, MapNode> = new Map();

    for (const nodeId of path) {
      const node = this.nodes.get(nodeId);

      if (node) {
        map.set(nodeId, node);
      }
    }

    return map;
  }

  dfs(startNodeId: string, endNodeId: string): Array<string> {
    const visited: Set<string> = new Set();
    const path: Array<string> = [];

    this.dfsRecursive(startNodeId, endNodeId, visited, path);

    return path;
  }

  dfsRecursive(
    currentNodeId: string,
    endNodeId: string,
    visited: Set<string>,
    path: Array<string>,
  ): boolean {
    if (currentNodeId === endNodeId) {
      path.push(currentNodeId);
      return true;
    }

    visited.add(currentNodeId);
    path.push(currentNodeId);

    const currentNode = this.nodes.get(currentNodeId)!;

    for (const neighborId of currentNode.neighbors) {
      if (!visited.has(neighborId)) {
        const found = this.dfsRecursive(neighborId, endNodeId, visited, path);
        if (found) return true;
      }
    }

    // If endNodeId is not found among neighbors of currentNode, backtrack
    path.pop();
    return false;
  }
}

export default DFSAlgo;
