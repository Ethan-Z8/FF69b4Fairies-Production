import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RouteIcon from "@mui/icons-material/Route";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import "../../styling/DisplayMapNodes.css";
import TransformContainer from "./TransformContainer.tsx";

import LL1 from "../../assets/hospitalmaps/00_thelowerlevel1-min.png";
import LL2 from "../../assets/hospitalmaps/00_thelowerlevel2-min.png";
import F1 from "../../assets/hospitalmaps/01_thefirstfloor-min.png";
import F2 from "../../assets/hospitalmaps/02_thesecondfloor-min.png";
import F3 from "../../assets/hospitalmaps/03_thethirdfloor-min.png";

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
import StartEndSelect from "./StartEndSelect.tsx";
import HoveredNodeData from "./HoveredNodeData.tsx";
import { MenuItem, Select } from "@mui/material";

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

const mapPath: string[] = [LL2, LL1, F1, F2, F3];
const mapPathNames: string[] = ["L2", "L1", "1", "2", "3"];

const floorNames: string[] = ["LL2", "LL1", "F1", "F2", "F3"];

export function NavigationMode() {
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

  const [toggleNodes, setToggleNodes] = useState(true);
  const [toggleEdges, setToggleEdges] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [ChosenAlgorithim, setChosenAlgorithim] = useState<string>("AStarAlgo");

  //const [defaultMap, setDefaultMap] = useState(0);

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
          const pathNodes = await axios.get(`/api/map/pathNodesShort`, {
            params: {
              start: firstClickedNodeId,
              end: secondClickedNodeId,
              algo: ChosenAlgorithim,
            },
          });
          const nodesData: Node[] = Object.values(pathNodes.data);
          setNodes(nodesData);

          if (hoveredNode != null) {
            const hoveredFloorIndex = mapPathNames.findIndex(
              (floor) =>
                floor.toLowerCase() === hoveredNode.floor.toLowerCase(),
            );
            if (hoveredFloorIndex !== -1) {
              setMapIndex(hoveredFloorIndex);
            }
          }
        } catch (error) {
          console.log("Error has not selected 2 nodes ");
        }
      };
      getPathNodes();
    } else {
      setNodes([]);
    }
  }, [
    hoveredNode,
    aNodes,
    secondClickedNodeId,
    firstClickedNodeId,
    ChosenAlgorithim,
  ]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (hoveredNode != null && hoveredNode.floor != mapPathNames[mapIndex]) {
      const hoveredFloorIndex = mapPathNames.findIndex(
        (floor) => floor.toLowerCase() === hoveredNode.floor.toLowerCase(),
      );
      timeoutId = setTimeout(() => {
        if (hoveredFloorIndex !== -1) {
          setMapIndex(hoveredFloorIndex);
        }
        return;
      }, 650);
    } else if (timeoutId) {
      clearTimeout(timeoutId);
    }
    /*timeoutId = setTimeout(() => {
      setMapIndex(defaultMap);
    }, 100);*/

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hoveredNode, mapIndex]);

  const handleToggleNodes = () => {
    clearSearch();
    setToggleNodes(!toggleNodes);
  };

  const handleToggleEdges = () => {
    setToggleEdges(!toggleEdges);
  };

  const handleMapSelect = (index: number) => {
    setMapIndex(index);
  };

  const clearSearch = () => {
    setFirstClickedNodeId("");
    setSecondClickedNodeId("");
  };

  const handleStartSelect = (value: string) => {
    setHoveredNode(null);
    setFirstClickedNodeId(value);
  };

  const handleEndSelect = (value: string) => {
    setHoveredNode(null);
    setSecondClickedNodeId(value);
  };

  const handleNodeClick = (node: Node) => {
    if (node) {
      switch (node.nodeID) {
        case firstClickedNodeId: {
          console.log("undo first");
          setFirstClickedNodeId("");
          break;
        }
        case secondClickedNodeId: {
          console.log("undo second");
          setSecondClickedNodeId("");
          break;
        }
        default: {
          if (firstClickedNodeId === "") {
            setFirstClickedNodeId(node.nodeID);
          } else if (secondClickedNodeId === "") {
            setClear({ nodes: false, edges: false });
            setSecondClickedNodeId(node.nodeID);
          } else {
            clearSearch();
            setFirstClickedNodeId(node.nodeID);
            setSecondClickedNodeId("");
          }
        }
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          height: 320,
          top: 10,
          left: "21%",
          zIndex: 4,
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: "fixed",
            top: 0,
            left: 5,
            zIndex: 1,
            backgroundColor: "transparent",
            ".MuiSpeedDial-fab": {
              backgroundColor: "#042c5c",
            },
            ".MuiSpeedDial-fab:hover": {
              backgroundColor: "lightblue",
            },
          }}
          icon={<MyLocationIcon />}
          direction="down"
        >
          <SpeedDialAction
            key={"Toggle Edge"}
            icon={<RouteIcon />}
            tooltipTitle={"Toggle Edge"}
            onClick={handleToggleEdges}
            tooltipPlacement={"right"}
            sx={{
              ".active": {
                COLOR: "yellow",
              },
            }}
          />
          <SpeedDialAction
            key={"Toggle Node"}
            icon={<AddLocationIcon />}
            tooltipTitle={"Toggle Node"}
            onClick={handleToggleNodes}
            tooltipPlacement={"right"}
          />
        </SpeedDial>
        <Select
          defaultValue={"AStarAlgo"}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          style={{
            position: "absolute",
            left: 70,
            zIndex: "5",
            backgroundColor: "#042c5c",
            borderRadius: 20,
            color: "white",
          }}
          sx={{
            ".MuiSelect-icon": {
              color: "white",
            },
            ".MuiSelect": {
              color: "#042c5c",
            },
          }}
          onChange={(e) => setChosenAlgorithim(e.target.value)}
        >
          <MenuItem value={"AStarAlgo"}>A*</MenuItem>
          <MenuItem value={"BFS"}>BFS</MenuItem>
          <MenuItem value={"DFS"}>DFS</MenuItem>
        </Select>
      </Box>
      <div className="total">
        <div className="nodeSelectContainer" style={{}}>
          <StartEndSelect
            start={firstClickedNodeId}
            end={secondClickedNodeId}
            onSelectStart={handleStartSelect}
            onSelectEnd={handleEndSelect}
            onHoverNode={setHoveredNode}
          />
        </div>
        <SelectorTabs
          mapIndex={mapIndex}
          onMapSelect={handleMapSelect}
          tabNames={floorNames}
          start={firstClickedNodeId}
          end={secondClickedNodeId}
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
              handleNodeHover={setHoveredNode}
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
        <HoveredNodeData node={hoveredNode} />
      </div>
    </div>
  );
}
