import { PathOrFileDescriptor, readFileSync } from "fs";

export default class MapEdge {
  edgeID: string;
  startNode: string;
  endNode: string;

  private constructor(properties: Array<string>) {
    [this.edgeID, this.startNode, this.endNode] = properties;
  }

  static readCsv(filename: PathOrFileDescriptor) {
    const input = readFileSync(filename, "utf8");

    // Split by lines. The first line is the headers, the last line is a blank
    const lines = input.split(/\r?\n/).slice(1, -1);
    return lines.map((line) => new MapEdge(line.split(",")));
  }
}
