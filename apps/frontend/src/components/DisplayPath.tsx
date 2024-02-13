import React, { useEffect, useState } from "react";
import axios from "axios";
import NodeSelectDropdown from "./NodeSelectDropdown";
import Button from "react-bootstrap/Button";
import NodeOnMap from "./NodeOnMap";
import "../styling/DisplayMapNodes.css";
import TransformContainer from "./TransformContainer.tsx";

import LL1 from "../assets/hospitalmaps/00_thelowerlevel1.png";
import LL2 from "../assets/hospitalmaps/00_thelowerlevel2.png";
import F1 from "../assets/hospitalmaps/01_thefirstfloor.png";
import F2 from "../assets/hospitalmaps/02_thesecondfloor.png";
import F3 from "../assets/hospitalmaps/03_thethirdfloor.png";
import SelectorTabs from "./SelectorTabs.tsx";

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

const mapPath: string[] = [F3, F2, F1, LL1, LL2];

const floorNames: string[] = [
  "Level 3",
  "Level 2",
  "Level 1",
  "Lower Level 1",
  "Lower Level 2",
];

const mapPathNames: string[] = ["3", "2", "1", "L1", "L2"];
export function DisplayPath() {
  const [firstClickedNodeId, setFirstClickedNodeId] = useState<string>("");
  const [secondClickedNodeId, setSecondClickedNodeId] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [counter, setCounter] = useState(false);
  const [mapIndex, setMapIndex] = useState(1);
  const [aNodes, setANodes] = useState<{ [key: string]: Node }>({});
  const [clear, setClear] = useState<{ nodes: boolean; edges: boolean }>({
    nodes: true,
    edges: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [shortNames, setShortNames] = useState({ start: "", end: "" });

  const [toggleNodes, setToggleNodes] = useState(false);
  const [toggleEdges, setToggleEdges] = useState(false);

  useEffect(() => {
    setMapIndex(1);
  }, []);

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map/allTemp`);
        const nodesData: Node[] = Object.values(allNodes.data);

        setAllNodes(nodesData);
      } catch (error) {
        console.error("Error fetching map nodess:", error);
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
          console.log(nodesData);

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
      if (!counter) {
        clearSearch();
        setFirstClickedNodeId(node.nodeID);
        setShortNames({ ...shortNames, start: node.shortName });

        setCounter(true);
      } else {
        setClear({ nodes: false, edges: false });
        setSecondClickedNodeId(node.nodeID);
        setShortNames({ ...shortNames, end: node.shortName });

        setCounter(false);
      }
    }
  };

  const renderPath = () => {
    if (clear.edges) return <div />;
    let circles: JSX.Element[];

    if (toggleEdges) {
      const visitedNodeIDs = new Set<string>();

      circles = allNodes
        .map((node) => {
          if (!visitedNodeIDs.has(node.nodeID)) {
            visitedNodeIDs.add(node.nodeID);

            return node.neighbors.map((nNode) => {
              const prevNode = aNodes[nNode];
              if (!prevNode) return <div />; // Skip if prevNode is undefined

              const lineStyles: React.CSSProperties = {
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
                transform: `rotate(${Math.atan2(
                  node.ycoord - prevNode.ycoord,
                  node.xcoord - prevNode.xcoord,
                )}rad)`,
              };
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
        const prevNode =
          prevIndex >= 0 && mapPathNames[mapIndex] == nodes[prevIndex].floor
            ? nodes[prevIndex]
            : null;

        const lineStyles: React.CSSProperties = prevNode
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

        return (
          <div key={one.nodeID} className="node-wrapper">
            {prevNode && <div className="line" style={lineStyles}></div>}
          </div>
        );
      });
    }

    return circles;
  };

  const renderCircles = () => {
    if (toggleNodes)
      return allNodes.map((node) => {
        if (node.floor === mapPathNames[mapIndex]) {
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
      return nodes.map((node) => {
        return (
          <div key={node.nodeID}>
            <NodeOnMap node={node} onNodeClick={() => handleNodeClick(node)} />
          </div>
        );
      });
  };

  return (
    <div>
      <div className={`tab ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        {" "}
        {"<"}{" "}
      </div>
      <div className={`map-control-panel ${menuOpen ? "open" : ""}`}>
        <div className="menu-content">
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              zIndex: "4",
              width: "10%",
              float: "right",
            }}
          >
            <Button
              onClick={handleToggleNodes}
              style={{
                width: "10vw",
              }}
            >
              Nodes: {toggleNodes ? "on" : "off"}
            </Button>
            <Button
              onClick={handleToggleEdges}
              style={{
                width: "10vw",
              }}
            >
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
