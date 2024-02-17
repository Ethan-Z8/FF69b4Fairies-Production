import React from "react";

interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  neighbors: string[];
}

interface Props {
  toggleEdges: boolean;
  mapIndex: number;
  mapPathNames: string[];
  allNodes: Node[];
  aNodes: Record<string, Node>;
  pathNodes: Node[];
  setMapIndex: React.Dispatch<React.SetStateAction<number>>;
  clearedEdges: boolean;
}

const RenderPath: React.FC<Props> = ({
  toggleEdges,
  mapIndex,
  mapPathNames,
  allNodes,
  aNodes,
  pathNodes,
  setMapIndex,
  clearedEdges,
}) => {
  if (clearedEdges) return <div />;
  let circles: JSX.Element[];

  if (toggleEdges) {
    const visitedNodeIDs = new Set<string>();

    circles = allNodes
      .map((node) => {
        if (!visitedNodeIDs.has(node.nodeID)) {
          visitedNodeIDs.add(node.nodeID);

          if (mapPathNames[mapIndex] === node.floor)
            return node.neighbors.map((nNode) => {
              const prevNode = aNodes[nNode];
              if (!prevNode) return <div />;

              const lineStyles: React.CSSProperties =
                prevNode?.floor === node.floor
                  ? {
                      position: "absolute",
                      left: `${prevNode.xcoord}px`,
                      top: `${prevNode.ycoord}px`,
                      width: `${Math.sqrt(
                        Math.pow(node.xcoord - prevNode.xcoord, 2) +
                          Math.pow(node.ycoord - prevNode.ycoord, 2),
                      )}px`,
                      height: "4px",
                      backgroundColor: "red",
                      zIndex: 3,
                      transformOrigin: "left center",
                      transform: `translate(0, -2px) rotate(${Math.atan2(
                        node.ycoord - prevNode.ycoord,
                        node.xcoord - prevNode.xcoord,
                      )}rad)`,
                    }
                  : {};

              const uniqueKey = `${nNode}-${node.nodeID}`;
              return (
                <div key={uniqueKey} className="node-wrapper">
                  <div className="line" style={lineStyles}></div>
                </div>
              );
            });
        }
        return <div />;
      })
      .flat();
  } else {
    circles = pathNodes.map((one, index) => {
      const prevIndex = index - 1;
      const prevNode = prevIndex >= 0 ? pathNodes[prevIndex] : null;

      const correctFloor = mapPathNames[mapIndex] === pathNodes[index].floor;

      const lineStyles: React.CSSProperties =
        prevNode && correctFloor && prevNode.floor === mapPathNames[mapIndex]
          ? {
              position: "absolute",
              left: `${prevNode.xcoord}px`,
              top: `${prevNode.ycoord}px`,
              width: `${Math.sqrt(
                Math.pow(one.xcoord - prevNode.xcoord, 2) +
                  Math.pow(one.ycoord - prevNode.ycoord, 2),
              )}px`,
              height: "4px",
              backgroundColor: "red",
              zIndex: 3,
              transformOrigin: "left center",
              transform: `rotate(${Math.atan2(
                one.ycoord - prevNode.ycoord,
                one.xcoord - prevNode.xcoord,
              )}rad)`,
            }
          : {};

      const nextNode = pathNodes[index + 1];
      let swapNode: Node | null = null;
      if (prevNode && prevNode.floor !== one.floor) swapNode = prevNode;
      else if (nextNode && nextNode.floor !== one.floor) swapNode = nextNode;

      const showChangeFloorButton = swapNode && correctFloor;

      const showChangeFloorButton2 =
        nextNode && nextNode.floor !== one.floor && correctFloor;

      const arrowDirection =
        swapNode && mapPathNames.indexOf(swapNode.floor) < mapIndex
          ? "down"
          : "up";

      return (
        <div key={one.nodeID} className="node-wrapper">
          <div>
            {prevNode && <div className="line" style={lineStyles}></div>}
            {showChangeFloorButton && (
              <div
                className={`arrow-${arrowDirection}`}
                style={{
                  position: "absolute",
                  left: `${one.xcoord}px`,
                  top: `${one.ycoord}px`,
                  zIndex: 4,
                }}
                onClick={() =>
                  setMapIndex(
                    mapPathNames.findIndex((item) => item === swapNode!.floor),
                  )
                }
              ></div>
            )}
            {showChangeFloorButton2 && (
              <div
                className={`arrow-${arrowDirection}`}
                style={{
                  position: "absolute",
                  left: `${one.xcoord}px`,
                  top: `${one.ycoord}px`,
                  zIndex: 4,
                }}
                onClick={() =>
                  setMapIndex(
                    mapPathNames.findIndex((item) => item === swapNode!.floor),
                  )
                }
              ></div>
            )}
          </div>
        </div>
      );
    });
  }

  return <>{circles}</>;
};

export default RenderPath;
