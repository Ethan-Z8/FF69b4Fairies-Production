import { PathOrFileDescriptor, readFileSync } from "fs";
import MapEdge from "./MapEdge.ts";
import { MapNodeInterface } from "../interfaces/MapNodeInterface.ts";

/**
 * Defining an omit type that does not have an array of neighbors.
 * This allows the node to be stored in the database without taking up unnecessary space
 * Then, when the graph needs to be constructed, we just use the regular MapNode, so we can keep track of neighbors
 */
export type MapNodeNoNeighbors = Omit<MapNode, "neighbors">;
export default class MapNode implements MapNodeInterface {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  neighbors: Array<string>;

  private constructor(properties: Array<string>) {
    let xcoord, ycoord;
    [
      this.nodeID,
      xcoord,
      ycoord,
      this.floor,
      this.building,
      this.nodeType,
      this.longName,
      this.shortName,
    ] = properties;

    // Have to do the x and y coordinates separately since they are numbers, not strings
    this.xcoord = Number(xcoord);
    this.ycoord = Number(ycoord);
    this.neighbors = new Array<string>();
  }

  /**
   * Creates an array of Mapnodes from a csv file
   * @param filename -- the csv file to get data from
   */
  static readCsv(filename: PathOrFileDescriptor) {
    const input = readFileSync(filename, "utf8");
    return MapNode.csvStringToNodes(input);
  }

  /**
   * Creates an array of Mapnodes from a csv formatted string
   * @param filename -- the csv file to get data from
   */
  static csvStringToNodes(input: string): MapNode[] {
    const lines = input.split(/\r?\n/).slice(0, -1);
    const top = lines.shift();
    if (
      top !== "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName"
    ) {
      throw new Error(
        `This csv does not have the right headers they should be: ${top}`,
      );
    }
    // The first line is the categories, and the last line is blank
    const splitLines = lines.map((aline) => aline.split(","));

    return splitLines.map((props) => new MapNode(props));
  }

  /**
   * Makes a graph of MapNodes from a list of nodes and edges
   * Each node contains a list of its neighbors
   * The graph is a hashmap with the nodeid as the key, and the node itself as the value
   *
   * @param nodes -- list of unconnected nodes
   * @param edges -- list of edges connecting nodes
   */
  static connectNodes(
    nodes: Array<MapNodeNoNeighbors>,
    edges: Array<MapEdge>,
  ): Map<string, MapNode> {
    // Make a hashmap out of the nodes, setting the key to be the node's id
    const map: Map<string, MapNode> = new Map<string, MapNode>(
      nodes.map((node) => [
        node.nodeID,
        { ...node, neighbors: new Array<string>() },
      ]),
    );

    // Add the edges to each node's
    for (const edge of edges) {
      // We can safely assume the graph will contain all nodes due to foreign key constraint
      map.get(edge.startNode)?.neighbors.push(edge.endNode);
      map.get(edge.endNode)?.neighbors.push(edge.startNode);
    }
    return map;
  }

  static dropNeighbors(nodes: MapNode[]): MapNodeNoNeighbors[] {
    return nodes.map((node: MapNode) => {
      // Can ignore this warning because we need to get the neighbors by name to omit them
      const { neighbors, ...rest } = node; //eslint-disable-line
      return rest;
    });
  }
}
