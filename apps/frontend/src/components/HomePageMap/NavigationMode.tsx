import React, { useEffect, useState } from "react";
import axios from "axios";
import NodeSelectDropdown from "./NodeSelectDropdown";
import Button from "react-bootstrap/Button";
import "../styling/DisplayMapNodes.css";
import TransformContainer from "./TransformContainer.tsx";

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

import SelectorTabs from "./SelectorTabs.tsx";
import RenderCircles from "./RenderCircles.tsx";
import RenderPath from "./RenderPath.tsx";

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

export function InteractiveMap() {
  const [firstClickedNodeId, setFirstClickedNodeId] = useState<string>("");
  const [secondClickedNodeId, setSecondClickedNodeId] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [imageSizes, setImageSizes] = useState<{ [key: string]: ImageSize }>({
    L1: { width: 0, height: 0 },
    L2: { width: 0, height: 0 },
    "1": { width: 0, height: 0 },
    "2": { width: 0, height: 0 },
    "3": { width: 0, height: 0 },
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

    const preloadImages = () => {
      mapPath.forEach((path, index) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          setImageSizes((prevSizes) => ({
            ...prevSizes,
            [mapPathNames[index]]: {
              width: img.width,
              height: img.height,
            },
          }));
        };
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (secondClickedNodeId !== "" && firstClickedNodeId !== "") {
      const getPathNodes = async () => {
        try {
          const pathNodes = await axios.get(`/api/map/pathNodes`, {
            params: {
              start: firstClickedNodeId,
              end: secondClickedNodeId,
            },
          });
          const nodesData: Node[] = Object.values(pathNodes.data);

          setNodes(nodesData);
        } catch (error) {
          console.log("Error has not selected 2 nodes ");
        }
      };
      getPathNodes();
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
    allNodes.forEach((node) => {
      if (node.shortName === value) {
        setFirstClickedNodeId(node.nodeID);
        setShortNames((prevShortNames) => ({
          ...prevShortNames,
          start: node.shortName,
        }));
      }
    });
  };

  const handleEndSelect = (value: string) => {
    allNodes.forEach((node) => {
      if (node.shortName === value) {
        setSecondClickedNodeId(node.nodeID);
        setShortNames((prevShortNames) => ({
          ...prevShortNames,
          end: node.shortName,
        }));
      }
    });
  };

  const handleNodeClick = (node: Node) => {
    if (node) {
      switch (node.nodeID) {
        case firstClickedNodeId: {
          console.log("undo first");
          setFirstClickedNodeId("");
          setShortNames((prevShortNames) => ({
            ...prevShortNames,
            start: "",
          }));
          break;
        }
        case secondClickedNodeId: {
          console.log("undo second");
          setSecondClickedNodeId("");
          setShortNames((prevShortNames) => ({
            ...prevShortNames,
            end: "",
          }));
          break;
        }
        default: {
          if (firstClickedNodeId === "") {
            setFirstClickedNodeId(node.nodeID);
            setShortNames((prevShortNames) => ({
              ...prevShortNames,
              start: node.shortName,
            }));
          } else if (secondClickedNodeId === "") {
            setClear({ nodes: false, edges: false });
            setSecondClickedNodeId(node.nodeID);
            setShortNames((prevShortNames) => ({
              ...prevShortNames,
              end: node.shortName,
            }));
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
              imageSizes[mapPathNames[mapIndex]]
                ? {
                    width: imageSizes[mapPathNames[mapIndex]].width,
                    height: imageSizes[mapPathNames[mapIndex]].height,
                  }
                : {}
            }
          >
            {mapPath.map((path, index) => (
              <img
                key={index}
                src={path}
                alt={`map-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  display: index === mapIndex ? "block" : "none",
                }}
              />
            ))}
            <RenderCircles
              allNodes={allNodes}
              pathNodes={nodes}
              floor={mapPathNames[mapIndex]}
              toggleNodes={toggleNodes}
              handleNodeClick={handleNodeClick}
            />
            <RenderPath
              allNodes={allNodes}
              pathNodes={nodes}
              aNodes={aNodes}
              clearedEdges={clear.edges}
              mapIndex={mapIndex}
              mapPathNames={mapPathNames}
              setMapIndex={setMapIndex}
              toggleEdges={toggleEdges}
            />
          </div>
        </TransformContainer>
      </div>
    </div>
  );
}
