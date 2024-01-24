import { PathOrFileDescriptor, readFileSync } from "fs";
import MapEdge from "./MapEdge.ts";

export default class MapNode {
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

  static readCsv(filename: PathOrFileDescriptor) {
    const input = readFileSync(filename, "utf8");

    const lines = input.split(/\r?\n/).slice(1, -1);
    // THe first line is the categories, and the last line is blank
    const splitLines = lines.map((aline) => aline.split(","));

    return splitLines.map((props) => new MapNode(props));
  }

  static connectNodes(
    nodes: Array<MapNode>,
    edges: Array<MapEdge>,
  ): Map<string, MapNode> {
    const map: Map<string, MapNode> = new Map<string, MapNode>(
      nodes.map((node) => [node.nodeID, node]),
    );
    for (const edge of edges) {
      // We can safely assume the graph will contain all nodes due to foreign key constraint
      map.get(edge.startNode)?.neighbors.push(edge.endNode);
      map.get(edge.endNode)?.neighbors.push(edge.startNode);
    }
    return map;
  }
}
