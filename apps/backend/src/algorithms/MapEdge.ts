import { PathOrFileDescriptor, readFileSync } from "fs";
import { MapEdgeInterface } from "../../../../packages/common/src/interfaces/MapEdgeInterface";

export default class MapEdge implements MapEdgeInterface {
  edgeID: string;
  startNode: string;
  endNode: string;

  private constructor(properties: Array<string>) {
    [this.edgeID, this.startNode, this.endNode] = properties;
  }

  static readCsv(filename: PathOrFileDescriptor): MapEdge[] {
    const input = readFileSync(filename, "utf8");
    return MapEdge.csvStringToEdges(input);
  }

  static csvStringToEdges(input: string): MapEdge[] {
    // Split by lines. The first line is the headers, the last line is a blank
    const lines = input.split(/\r?\n/).slice(0, -1);
    const top = lines.shift();
    if (top !== "edgeID,startNode,endNode") {
      throw new Error(
        `This csv does not have the right headers they should be: ${top}`,
      );
    }
    return lines.map((line) => new MapEdge(line.split(",")));
  }
}
