import React, { useEffect, useState } from "react";
import axios from "axios";
import NodeSelectDropdown from "./HomePageMap/NodeSelectDropdown.tsx";
import Button from "react-bootstrap/Button";
import NodeOnMap from "./HomePageMap/NodeOnMap.tsx";
import "../styling/DisplayMapNodes.css";
import TransformContainer from "./HomePageMap/TransformContainer.tsx";

import LL1 from "../assets/hospitalmaps/00_thelowerlevel1-min.png";
import LL2 from "../assets/hospitalmaps/00_thelowerlevel2-min.png";
import F1 from "../assets/hospitalmaps/01_thefirstfloor-min.png";
import F2 from "../assets/hospitalmaps/02_thesecondfloor-min.png";
import F3 from "../assets/hospitalmaps/03_thethirdfloor-min.png";

/*
import GRLR from "../assets/hospitalmaps/00_thegroundfloor-lowRes.png";
import LL1LR from "../assets/hospitalmaps/00_thelowerlevel1-lowRes.png";
import LL2LR from "../assets/hospitalmaps/00_thelowerlevel2-lowRes.png";
import F1LR from "../assets/hospitalmaps/01_thefirstfloor-lowRes.png";
import F2LR from "../assets/hospitalmaps/02_thesecondfloor-lowRes.png";
import F3LR from "../assets/hospitalmaps/03_thethirdfloor-lowRes.png";
*/

import SelectorTabs from "./HomePageMap/SelectorTabs.tsx";

interface Node {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
  neighbors: string[];
}

interface ImageSize {
  width: number;
  height: number;
}

const mapPath: string[] = [LL1, LL2, F1, F2, F3];

const mapPathNames: string[] = ["L1", "L2", "1", "2", "3"];
const floorNames: string[] = [
  "Lower Level 2",
  "Lower Level 1",
  "Level 1",
  "Level 2",
  "Level 3",
];

export function DisplayPath() {
  const [firstClickedNodeId, setFirstClickedNodeId] = useState<string>("");
  const [secondClickedNodeId, setSecondClickedNodeId] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize>({
    width: 5000,
    height: 3400,
  });
  const [mapIndex, setMapIndex] = useState(0);
  const [aNodes, setANodes] = useState<{ [key: string]: Node }>({});
  const [clear, setClear] = useState<{ nodes: boolean; edges: boolean }>({
    nodes: true,
    edges: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [shortNames, setShortNames] = useState({ start: "", end: "" });

  const [toggleNodes, setToggleNodes] = useState(true);
  const [toggleEdges, setToggleEdges] = useState(false);

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map/allTemp`);
        const nodesData: Node[] = Object.values(allNodes.data);

        setAllNodes(nodesData);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };

    const all = async () => {
      try {
        const response = await axios.get(`/api/map/allTemp`);
        const aNodes: { [key: string]: Node } = response.data;
        setANodes(aNodes);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };

    all();
    getAllNodes();

    const img = new Image();
    img.src = mapPath[mapIndex];
    img.onload = () => {
      setImageSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [mapIndex]);

  useEffect(() => {
    console.log(firstClickedNodeId, secondClickedNodeId);
    if (secondClickedNodeId != "" && firstClickedNodeId != "") {
      const getMapNodesByShort = async () => {
        try {
          const pathNodes = await axios.get(`/api/map/pathNodesShort`, {
            params: {
              start: aNodes[firstClickedNodeId].shortName,
              end: aNodes[secondClickedNodeId].shortName,
            },
          });
          const nodesData: Node[] = Object.values(pathNodes.data);

          setNodes(nodesData);
        } catch (error) {
          console.log("Error has not selected 2 nodes ");
        }
      };
      getMapNodesByShort();
    } else {
      setNodes([]);
    }
  }, [aNodes, secondClickedNodeId, firstClickedNodeId]);

  const handleToggleNodes = () => {
    clearSearch();
    setToggleNodes(!toggleNodes);
  };

  const handleToggleEdges = () => {
    setToggleEdges(!toggleEdges);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMapSelect = (index: number) => {
    setMapIndex(index);
  };

  const clearSearch = () => {
    setFirstClickedNodeId("");
    setSecondClickedNodeId("");
    setShortNames({ start: "", end: "" });
  };

  const handleStartSelect = (value: string) => {
    allNodes.map((node) => {
      if (node.shortName == value) {
        setFirstClickedNodeId(node.nodeID);
        setShortNames({ ...shortNames, start: node.shortName });
      }
    });
  };

  const handleEndSelect = (value: string) => {
    allNodes.map((node) => {
      if (node.shortName == value) {
        setSecondClickedNodeId(node.nodeID);
        setShortNames({ ...shortNames, end: node.shortName });
      }
    });
  };

  const handleNodeClick = (node: Node) => {
    if (node) {
      switch (node.nodeID) {
        case firstClickedNodeId: {
          console.log("undo first");
          setFirstClickedNodeId("");
          setShortNames({ ...shortNames, start: "" });
          break;
        }
        case secondClickedNodeId: {
          console.log("undo second");
          setSecondClickedNodeId("");
          setShortNames({ ...shortNames, end: "" });
          break;
        }
        default: {
          if (firstClickedNodeId == "") {
            // console.log(firstClickedNodeId);
            setFirstClickedNodeId(node.nodeID);
            setShortNames({ ...shortNames, start: node.shortName });
          } else if (secondClickedNodeId == "") {
            setClear({ nodes: false, edges: false });
            setSecondClickedNodeId(node.nodeID);
            setShortNames({ ...shortNames, end: node.shortName });
          } else {
            clearSearch();
            setFirstClickedNodeId(node.nodeID);
            setSecondClickedNodeId("");
            setShortNames({ start: node.shortName, end: "" });
          }
        }
      }
    }
  };

  // const renderNames = () => {
  //   const node1 = aNodes[firstClickedNodeId];
  //   const node2 = aNodes[secondClickedNodeId];
  //   if (node1 && node2)
  //     return (
  //       <div>
  //         <div
  //           style={{
  //             position: "absolute",
  //             left: node1.xcoord,
  //             bottom: imageSize.height - node1.ycoord + 16,
  //             transform: "translateX(-50%)",
  //             backgroundColor: "#fff",
  //             width: "10vw",
  //             zIndex: 18,
  //             border: "1px solid",
  //             padding: "6px",
  //             borderRadius: "3px",
  //           }}
  //         >
  //           {node1.longName}
  //         </div>
  //         <div
  //           style={{
  //             position: "absolute",
  //             left: node2.xcoord,
  //             bottom: imageSize.height - node2.ycoord + 16,
  //             transform: "translateX(-50%)",
  //             backgroundColor: "#fff",
  //             width: "10vw",
  //             zIndex: 18,
  //             border: "1px solid",
  //             padding: "6px",
  //             borderRadius: "3px",
  //           }}
  //         >
  //           {node2.longName}
  //         </div>
  //       </div>
  //     );
  //   if (node1)
  //     return (
  //       <div>
  //         <div
  //           style={{
  //             position: "absolute",
  //             left: node1.xcoord,
  //             bottom: imageSize.height - node1.ycoord + 16,
  //             transform: "translateX(-50%)",
  //             backgroundColor: "#fff",
  //             width: "10vw",
  //             zIndex: 18,
  //             border: "1px solid",
  //             padding: "6px",
  //             borderRadius: "6px",
  //           }}
  //         >
  //           {node1.longName}
  //         </div>
  //       </div>
  //     );
  // };
  const renderPath = () => {
    if (clear.edges) return <div />;
    let circles: JSX.Element[];

    if (toggleEdges) {
      const visitedNodeIDs = new Set<string>();

      circles = allNodes
        .map((node) => {
          if (!visitedNodeIDs.has(node.nodeID)) {
            visitedNodeIDs.add(node.nodeID);

            if (mapPathNames[mapIndex] == node.floor)
              return node.neighbors.map((nNode) => {
                const prevNode = aNodes[nNode];
                if (!prevNode) return <div />;

                const lineStyles: React.CSSProperties =
                  prevNode?.floor == node.floor
                    ? {
                        position: "absolute",
                        left: `${prevNode.xcoord}px`,
                        top: `${prevNode.ycoord}px`,
                        width: `${Math.sqrt(
                          Math.pow(node.xcoord - prevNode.xcoord, 2) +
                            Math.pow(node.ycoord - prevNode.ycoord, 2),
                        )}px`,
                        height: "4px",
                        backgroundColor: "black",
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
      circles = nodes.map((one, index) => {
        const prevIndex = index - 1;
        const prevNode = prevIndex >= 0 ? nodes[prevIndex] : null;

        const correctFloor = mapPathNames[mapIndex] == nodes[index].floor;

        const lineStyles: React.CSSProperties =
          prevNode && correctFloor && prevNode.floor == mapPathNames[mapIndex]
            ? {
                position: "absolute",
                left: `${prevNode.xcoord}px`,
                top: `${prevNode.ycoord}px`,
                width: `${Math.sqrt(
                  Math.pow(one.xcoord - prevNode.xcoord, 2) +
                    Math.pow(one.ycoord - prevNode.ycoord, 2),
                )}px`,
                height: "4px",
                backgroundColor: "black",
                zIndex: 3,
                transformOrigin: "left center",
                transform: `rotate(${Math.atan2(
                  one.ycoord - prevNode.ycoord,
                  one.xcoord - prevNode.xcoord,
                )}rad)`,
              }
            : {};

        const nextNode = nodes[index + 1];
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
                      mapPathNames.findIndex(
                        (item) => item === swapNode!.floor,
                      ),
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
                      mapPathNames.findIndex(
                        (item) => item === swapNode!.floor,
                      ),
                    )
                  }
                ></div>
              )}
            </div>
          </div>
        );
      });
    }

    return circles;
  };

  const renderCircles = () => {
    if (toggleNodes)
      return allNodes.map((node) => {
        if (node.floor === mapPathNames[mapIndex] && node.nodeType != "HALL") {
          return (
            <div key={node.nodeID}>
              <NodeOnMap
                node={node}
                onNodeClick={() => handleNodeClick(node)}
              />
            </div>
          );
        }
      });
    else
      return nodes
        .filter((node) => node.floor === mapPathNames[mapIndex])
        .map((node) => {
          return (
            <div key={node.nodeID}>
              <NodeOnMap
                node={node}
                onNodeClick={() => handleNodeClick(node)}
              />
            </div>
          );
        });
  };

  return (
    <div>
      <div
        className={`tab ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`map-control-panel ${menuOpen ? "open" : ""}`}>
        <div className="menu-content">
          <div
            style={{
              position: "absolute",
              left: "10%",
              top: "10%",
              height: "10%",
              width: "80%",
              float: "right",
              display: "flex",
              flexDirection: "column",
              gap: "20%",
              zIndex: "2",
            }}
          >
            <Button onClick={handleToggleNodes}>
              Nodes: {toggleNodes ? "on" : "off"}
            </Button>
            <Button onClick={handleToggleEdges}>
              Edges: {toggleEdges ? "on" : "off"}
            </Button>
          </div>
        </div>
      </div>
      <div className="total">
        <div
          className="nodeSelectContainer"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: "50px" }}>Start:</span>
            <NodeSelectDropdown
              label={shortNames.start}
              onSelect={handleStartSelect}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: "50px" }}>End:</span>
            <NodeSelectDropdown
              label={shortNames.end}
              onSelect={handleEndSelect}
            />
          </div>
          <Button onClick={clearSearch}>Clear</Button>
        </div>
        <SelectorTabs
          mapIndex={mapIndex}
          onMapSelect={handleMapSelect}
          tabNames={floorNames}
        />
        <TransformContainer>
          <div
            className="map-container"
            style={
              imageSize
                ? { width: imageSize.width, height: imageSize.height }
                : {}
            }
          >
            <img
              src={mapPath[mapIndex]}
              alt="map"
              style={{ width: "100%", height: "100%" }}
            />
            <div>{renderCircles()}</div>
            <div>{renderPath()}</div>
          </div>
        </TransformContainer>
      </div>
    </div>
  );
}
