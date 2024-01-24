import { PathOrFileDescriptor, readFileSync } from "fs";

export default class MapNode {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  // neighbors: Array<string>;

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
    // this.neighbors = new Array<string>
  }

  static readCsv(filename: PathOrFileDescriptor) {
    const input = readFileSync(filename, "utf8");

    const lines = input.split(/\r?\n/).slice(1, -1);
    // THe first line is the categories, and the last line is blank
    const splitLines = lines.map((aline) => aline.split(","));

    return splitLines.map((props) => new MapNode(props));
  }

  // static connectNodes(nodes: Array<MapNode>, edgesFile: PathOrFileDescriptor): Array<MapNode> {
  //     const input = readFileSync(edgesFile, "utf8");
  //
  //     // Split by lines. The first line is the headers, the last line is a blank
  //     const lines = input.split(/\r?\n/).slice(1, -1);
  //     lines.forEach((line) => {
  //         let [edgeID, startNode, endNode] = line.split(",");
  //         for (let node of nodes) {
  //             if (node.nodeID === startNode) {
  //                 node.neighbors.push(endNode)
  //             }
  //             if (node.nodeID === endNode) {
  //                 node.neighbors.push(startNode)
  //             }
  //         }
  //     });
  //     return nodes
  // }
}
