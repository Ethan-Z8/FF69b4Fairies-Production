import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RouteIcon from "@mui/icons-material/Route";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import "../../styling/DisplayMapNodes.css";
import TransformContainer from "./TransformContainer.tsx";
import InfoOffCanvas from "../InfoOffCanvas.tsx";

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
import { MenuItem, Select, Switch } from "@mui/material";
import MouseClickMenu from "./MouseClickMenu.tsx";
import ElevatorIcon from "@mui/icons-material/Elevator";
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

export interface NavigationModeProps {
  destinationID?: string;
}

export function NavigationMode({ destinationID }: NavigationModeProps) {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [firstClickedNodeId, setFirstClickedNodeId] = useState<string>("");
  const [secondClickedNodeId, setSecondClickedNodeId] = useState<string>(
    destinationID ? destinationID : "",
  );
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
  const [localPosition, setLocalPosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const [toggleNodes, setToggleNodes] = useState(true);
  const [toggleEdges, setToggleEdges] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [ChosenAlgorithim, setChosenAlgorithim] = useState<string>("AStarAlgo");
  const [zoomToCoords, setZoomToCoords] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const [debouncedZoomToCoords, setDebouncedZoomToCoords] = useState<
    | {
        x: number;
        y: number;
      }
    | undefined
  >(undefined);

  // Debounce effect for zoomToCoords
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedZoomToCoords(zoomToCoords);
    }, 800);

    return () => clearTimeout(timer);
  }, [zoomToCoords]);

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
      let bool = "false";
      if (checked) {
        bool = "true";
      }
      const getPathNodes = async () => {
        try {
          const pathNodes = await axios.get(`/api/map/pathNodesShort`, {
            params: {
              start: firstClickedNodeId,
              end: secondClickedNodeId,
              algo: ChosenAlgorithim,
              noStair: bool,
            },
          });
          const nodesData: Node[] = Object.values(pathNodes.data);
          setNodes(nodesData);
        } catch (error) {
          console.log("Error has not selected 2 nodes ");
        }
      };
      getPathNodes();
      /*      const hoveredFloorIndex = mapPathNames.findIndex(
              (floor) =>
                floor.toLowerCase() ===
                aNodes[firstClickedNodeId].floor.toLowerCase(),
            );
            if (hoveredFloorIndex !== -1) {
              setMapIndex(hoveredFloorIndex);
            }*/
    } else {
      setNodes([]);
    }
  }, [
    hoveredNode,
    aNodes,
    secondClickedNodeId,
    firstClickedNodeId,
    ChosenAlgorithim,
    checked,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (hoveredNode != null && hoveredNode.floor != mapPathNames[mapIndex]) {
        const hoveredFloorIndex = mapPathNames.findIndex(
          (floor) => floor.toLowerCase() === hoveredNode.floor.toLowerCase(),
        );
        if (hoveredFloorIndex !== -1) {
          setMapIndex(hoveredFloorIndex);
        }
        return;
      } else {
        clearTimeout(timeoutId);
      }
    }, 780);
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
          setFirstClickedNodeId("");
          break;
        }
        case secondClickedNodeId: {
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
    <div style={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          width: "15%",
          height: 320,
          top: 20,
          left: "23%",
          zIndex: 100,
          transform: "translateZ(0px)",
          justifyContent: "space-between",
          flexDirection: "row",
          gap: "0%",
        }}
      >
        <div className="element">
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              top: 0,
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
                backgroundColor: toggleEdges ? "lightblue" : "inherit",
              }}
            />
            <SpeedDialAction
              key={"Toggle Node"}
              icon={<AddLocationIcon />}
              tooltipTitle={"Toggle Node"}
              onClick={handleToggleNodes}
              tooltipPlacement={"right"}
              sx={{
                backgroundColor: toggleNodes ? "lightblue" : "inherit",
              }}
            />
          </SpeedDial>
        </div>

        <div className="element">
          <Select
            defaultValue={"AStarAlgo"}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            style={{
              zIndex: 5,
              height: "17%",
              backgroundColor: "#042c5c",
              borderRadius: "16px",
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
            <MenuItem value={"DijkstraAlgo"}>Dijkstra's</MenuItem>
          </Select>
        </div>
        <div>
          <Box
            sx={{
              backgroundColor: "#042c5c",
              zIndex: 24,
              borderRadius: "16px",
            }}
          >
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  value={"start"}
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  sx={{ margin: 1 }}
                  label={<ElevatorIcon sx={{ color: "white" }} />}
                  labelPlacement={"start"}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </div>
      </Box>
      <InfoOffCanvas />
      <div className="total">
        <div className="nodeSelectContainer" style={{}}>
          <StartEndSelect
            start={firstClickedNodeId}
            end={secondClickedNodeId}
            onSelectStart={handleStartSelect}
            onSelectEnd={handleEndSelect}
            onHoverNode={(node) => {
              setHoveredNode(node);
              if (node) {
                setZoomToCoords({ x: node.xcoord, y: node.ycoord });
              } else {
                setZoomToCoords(undefined);
              }
            }}
            algo={ChosenAlgorithim}
          />
        </div>

        <SelectorTabs
          mapIndex={mapIndex}
          onMapSelect={handleMapSelect}
          tabNames={floorNames}
          start={firstClickedNodeId}
          end={secondClickedNodeId}
        />

        <TransformContainer zoomToCoordinate={debouncedZoomToCoords}>
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
              setPosition={setLocalPosition}
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
        <HoveredNodeData node={hoveredNode} handleNodeHover={setHoveredNode} />
        <MouseClickMenu node={hoveredNode} localPosition={localPosition} />
      </div>
    </div>
  );
}
