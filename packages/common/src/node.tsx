/**
 * Node class : represents a position in the building
 * nodeID : ID of the Node
 * xcoord : xcoordinate of the node on the map
 * ycoord : ycoordinate of the node on the map
 * floor : the floor this node is on
 * building : which building is this node in
 * nodeType : what is this nodes type
 * longName : the long name for the node
 * shortName : the short name for the node
 * number getXCoord() : getter for xcoord
 * number getYCoord : getter for ycoord
 * thisNodeIsNextTo : add a shortName to tell this node that it is next to the node with the shortName passed in
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class node {
  //
  private nodeID: string;
  private xcoord: number;
  private ycoord: number;
  private floor: string;
  private building: string;
  private nodeType: string;
  private longName: string;
  private shortName: string;
  private nodesNextTo: string[];

  /**
   *
   * @param nodeID
   * @param xcoord
   * @param ycoord
   * @param floor
   * @param building
   * @param nodeType
   * @param longName
   * @param shortName
   */
  constructor(
    nodeID: string,
    xcoord: number,
    ycoord: number,
    floor: string,
    building: string,
    nodeType: string,
    longName: string,
    shortName: string,
  ) {
    this.nodeID = nodeID;
    this.xcoord = xcoord;
    this.ycoord = ycoord;
    this.floor = floor;
    this.building = building;
    this.nodeType = nodeType;
    this.longName = longName;
    this.shortName = shortName;
    this.nodesNextTo = [];
  }
  public getXCoord() {
    return this.xcoord;
  }
  public getYCoord() {
    return this.ycoord;
  }
  public thisNodeIsNextTo(NameOfNodeThisNodeIsNextToo: string) {
    this.nodesNextTo.push(NameOfNodeThisNodeIsNextToo);
  }
}
