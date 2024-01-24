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
  }

  static readCsv(filename: PathOrFileDescriptor) {
    const input = readFileSync(filename, "utf8");

    const lines = input.split(/\r?\n/);
    // THe first line is the categories, and the last line is blank
    const splitLines = lines.slice(1, -1).map((aline) => aline.split(","));

    return splitLines.map((props) => new MapNode(props));
  }
}
