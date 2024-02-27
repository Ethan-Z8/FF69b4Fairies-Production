import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./StartEndSelect.css";
import TextDirectionPathFinding from "./TextDirectionPathFinding.tsx";
import QRCode from "react-qr-code";
import Chip from "@mui/material/Chip";
import WcIcon from "@mui/icons-material/Wc";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ElevatorIcon from "@mui/icons-material/Elevator";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme, ThemeProvider } from "@mui/system";

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

interface NodeSelectProps {
  start: string;
  end: string;
  onSelectStart: (
    item: string,
    event: React.SyntheticEvent<HTMLElement>,
  ) => void;
  onSelectEnd: (item: string, event: React.SyntheticEvent<HTMLElement>) => void;
  onHoverNode: (node: Node | null) => void;
}

//const findablePlaces = ["Exit", "Restroom", "Info Desk", "Elevator", "Shop"];
//const findableTypes = ["EXIT", "INFO", "REST", "ELEV", "RETL", "BATH", "SERV"];

const theme = createTheme({
  palette: {
    text: {
      primary: "0f2c57",
    },
  },
});

const StartEndSelect: React.FC<NodeSelectProps> = ({
  start,
  end,
  onSelectStart,
  onSelectEnd,
  onHoverNode,
}) => {
  const [startID, setStartID] = useState(start);
  const [endID, setEndID] = useState(end);
  const [startName, setStartName] = useState("");
  const [endName, setEndName] = useState("");
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  const [items, setItems] = useState<Node[]>([]);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isEndFocused, setIsEndFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState([false, false]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [targetType, setTargetType] = useState("");
  const [resetPath, setResetPath] = useState(false);

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map`);
        setNodes(allNodes.data);
        const nodesData: Node[] = Object.values(allNodes.data);

        const filteredNodes = nodesData.filter(
          (node) => node.nodeType !== "HALL",
        );
        setItems(filteredNodes);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };
    getAllNodes();
  }, []);

  useEffect(() => {
    if (start && nodes[start]) {
      const node = nodes[start];
      if (node.longName.length > 30) setStartName(node.shortName);
      else setStartName(node.longName);
      setStartID(start);
    } else {
      setStartName("");
      setStartID("");
    }
  }, [start, nodes]);

  useEffect(() => {
    const getNearestType = async () => {
      try {
        const targetNode = await axios.get(`/api/map/nearestType`, {
          params: {
            start: startID,
            type: targetType,
          },
        });
        const target: string = targetNode.data;
        if (target != "") {
          onSelectEnd(target, {} as React.SyntheticEvent<HTMLElement>);
        }
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };

    if (startID != "" && targetType != "") {
      getNearestType();
    }
  }, [onSelectEnd, startID, targetType]);

  useEffect(() => {
    const node = nodes[end];
    if (end && nodes[end]) {
      if (node.longName.length > 30) setEndName(node.shortName);
      else setEndName(node.longName);
      setEndID(end);
    } else {
      setEndName("");
      setEndID("");
    }
  }, [end, nodes]);

  /*  useEffect(() => {
    if (nodes[endID]) {
      const node = nodes[endID];
      if (node.longName.length > 30) setEndName(node.shortName);
      else setEndName(node.longName);
    } else if (endID == '') {
      setEndName("");
    }
  }, [endID, nodes]);
  useEffect(() => {
    if (nodes[startID]) {
      const node = nodes[startID];
      if (node.longName.length > 30) setStartName(node.shortName);
      else setStartName(node.longName);
    } else if (startID == '') {
      setStartName("");
    }
  }, [startID, nodes]);*/

  useEffect(() => {
    const handleMouseDown = () => {
      if (!isStartFocused && !isEndFocused) {
        setShowSuggestions([false, false]);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isEndFocused, isStartFocused]);

  useEffect(() => {
    setShowSuggestions([false, false]);
    if (startID != "" && endID != "") {
      setForceClose(false);
      setResetPath((prev) => !prev);
    }
    if (startID == "") {
      setStartName("");
    }
    if (endID == "") {
      setEndName("");
    }
  }, [startID, endID]);

  const handleFocusStart = () => {
    setIsStartFocused(true);
  };

  const handleFocusEnd = () => {
    setIsEndFocused(true);
  };

  const handleMouseLeave = () => {
    setIsStartFocused(false);
    setIsEndFocused(false);
  };

  const handleKeyDown = (
    setter: (value: string) => void,
    setterName: (value: string) => void,
    event: React.KeyboardEvent<HTMLInputElement>,
    filteredItems: Node[],
  ) => {
    if (event.key === "Enter" && filteredItems.length > 0) {
      const ID = filteredItems[0].nodeID;
      setter(ID);
      if (nodes[ID].longName.length > 30) setterName(nodes[ID].shortName);
      else setterName(nodes[ID].longName);
    }
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSelect: (item: string, event: React.SyntheticEvent<HTMLElement>) => void,
    setTerm: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setName(e.target.value);
    const results = items.filter(
      (node) =>
        node.nodeID === e.target.value ||
        node.shortName === e.target.value ||
        node.longName === e.target.value,
    );

    if (results.length === 1) {
      setTerm(results[0].nodeID);
      if (inputRef.current) {
        inputRef.current.value = results[0].nodeID;
      }
      onSelect(results[0].nodeID, {} as React.SyntheticEvent<HTMLElement>);
    } else {
      setTerm("");
    }
  };
  const [forceClose, setForceClose] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        onMouseLeave={handleMouseLeave}
        style={{
          borderRadius: "16px",
          width: "100%",
          zIndex: 30,
          backgroundColor: "transparent",
          position: "relative",
          height: "48px",
        }}
      >
        <div style={{ height: "100%" }}>
          <input
            ref={inputRef}
            type="text"
            onKeyDown={(event) =>
              handleKeyDown(
                setStartID,
                setStartName,
                event,
                items.filter(
                  (node) =>
                    node.shortName
                      .toLowerCase()
                      .includes(startName.toLowerCase()) ||
                    node.longName
                      .toLowerCase()
                      .includes(startName.toLowerCase()) ||
                    node.nodeID
                      .toLowerCase()
                      .includes(startName.toLowerCase()) ||
                    node.nodeType
                      .toLowerCase()
                      .includes(startName.toLowerCase()),
                ),
              )
            }
            value={startName}
            onChange={(e) => {
              handleSearch(e, onSelectStart, setStartID, setStartName);
              if (isStartFocused) setShowSuggestions([true, false]);
              setShowSuggestions([true, false]);
            }}
            onFocus={handleFocusStart}
            onClick={() => setShowSuggestions([true, false])}
            style={{
              border: "5px solid rgba(0, 0, 0, 0.1)",
              borderTopRightRadius: "16px",
              borderTopLeftRadius: "16px",
              paddingLeft: "16px",
              fontSize: "18px",
              outline: "none",
              width: "100%",
              minHeight: "48px",
              backgroundColor: "#0E6244",
              color: "white",
              boxShadow: "1px -1px 2px rgba(0, 0, 0, 0.2)",
              caretColor: isStartFocused ? "white" : "transparent",
              zIndex: 20,
            }}
            placeholder="Start Location"
          />
          <div
            style={{
              position: "relative",
              zIndex: 20,
              marginTop: "-38px",
              float: "right",
              right: "16px",
            }}
          >
            {startID != "" ? (
              <span
                style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}
                onClick={() => {
                  setStartID("");
                  setStartName("");
                }}
              >
                ✕
              </span>
            ) : (
              <span
                style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}
                onClick={() => {
                  setIsStartFocused(true);
                  setShowSuggestions([true, false]);
                }}
              >
                ▼
              </span>
            )}
          </div>
          {showSuggestions[0] && (
            <div
              className="scroll-container"
              style={{
                position: "absolute",
                left: 0,
                top: "24px",
                backgroundColor: "white",
                width: "80%",
                zIndex: -1,
                height: "30vh",
                borderRadius: "16px",
                overflow: "hidden",
                overflowY: "scroll",
                boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ul
                style={{ listStyleType: "none", padding: "32px 0 0 0" }}
                onMouseEnter={() => setIsStartFocused(true)}
              >
                {items
                  .filter(
                    (node) =>
                      node.shortName
                        .toLowerCase()
                        .includes(startName.toLowerCase()) ||
                      node.longName
                        .toLowerCase()
                        .includes(startName.toLowerCase()) ||
                      node.nodeID
                        .toLowerCase()
                        .includes(startName.toLowerCase()) ||
                      node.nodeType
                        .toLowerCase()
                        .includes(startName.toLowerCase()),
                  )
                  .map((node) => (
                    <li
                      onMouseEnter={() => {
                        onHoverNode(node);
                      }}
                      onMouseLeave={() => {
                        onHoverNode(null);
                      }}
                      key={node.nodeID}
                      onClick={() => {
                        onSelectStart(
                          node.nodeID,
                          {} as React.SyntheticEvent<HTMLElement>,
                        );
                        if (node.longName.length > 30)
                          setStartName(node.shortName);
                        else setStartName(node.longName);
                        setStartID(node.nodeID);

                        setShowSuggestions([true, false]);
                      }}
                      style={{
                        /*                      backgroundColor:
                                                hoveredItem == node.nodeID
                                                  ? "rgba(255, 255, 255, 0.1)"
                                                  : "white",*/
                        padding: "8px",
                        cursor: "pointer",
                        marginBottom: "2px",
                        marginTop: "2px",

                        transition: "background-color 0.1s",
                      }}
                    >
                      {node.longName}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: -10,
            width: "100%",
          }}
        >
          <div>
            <div
              onClick={() => {
                onSelectStart("", {} as React.SyntheticEvent<HTMLElement>);
                onSelectEnd("", {} as React.SyntheticEvent<HTMLElement>);
                setTargetType("");
                setStartID("");
                setEndID("");
              }}
              className="HAHAHHA"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "48px",
                color: "purple",
                width: "20%",
                borderBottomRightRadius: "16px",
                border: "5px solid purple",
                backgroundColor: "rgba(210, 190, 210, 0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {" "}
              CLEAR
            </div>
            <div
              onClick={() => setForceClose(true)}
              className="HAHAHHA"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                height: "48px",
                color: "#8B2121",
                width: "20%",
                borderTopRightRadius: "16px",
                border: "5px solid #8B2121",
                backgroundColor: "rgba(180, 140, 140, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {" "}
              HIDE
            </div>

            {startID && endID && (
              <div>
                <h1
                  style={{
                    width: "80%",
                    height: "100%",
                    fontSize: "30px",
                    backgroundColor: "white",
                    padding: "10px",
                  }}
                >
                  QR Code for mobile
                </h1>
                <QRCode
                  style={{
                    width: "80%",
                    height: "100%",
                  }}
                  value={`${window.location.href}directions/${startID}-${endID}`}
                />
              </div>
            )}

            <TextDirectionPathFinding
              start={startID}
              end={endID}
              forceClose={forceClose}
              resetPath={resetPath}
            />
          </div>
        </div>
        <div style={{ position: "relative", zIndex: -10 }}>
          <input
            type="text"
            value={endName}
            onKeyDown={(event) =>
              handleKeyDown(
                setEndID,
                setEndName,
                event,
                items.filter(
                  (node) =>
                    node.shortName
                      .toLowerCase()
                      .includes(endName.toLowerCase()) ||
                    node.longName
                      .toLowerCase()
                      .includes(endName.toLowerCase()) ||
                    node.nodeID.toLowerCase().includes(endName.toLowerCase()) ||
                    node.nodeType.toLowerCase().includes(endName.toLowerCase()),
                ),
              )
            }
            onChange={(e) => {
              handleSearch(e, onSelectEnd, setEndID, setEndName);
              if (isEndFocused) setShowSuggestions([false, true]);
              setShowSuggestions([false, true]);
              setForceClose(false);
            }}
            onFocus={handleFocusEnd}
            onClick={() => {
              if (forceClose) setForceClose(false);
              else setShowSuggestions([false, true]);
            }}
            style={{
              border: "5px solid rgba(0, 0, 0, 0.1)",
              borderBottomRightRadius: "16px",
              borderBottomLeftRadius: showSuggestions[1] ? "4px" : "16px",
              paddingLeft: "16px",
              fontSize: "18px",
              outline: "none",
              width: "100%",
              minHeight: "48px",
              backgroundColor: "#8B2121",
              color: "white",
              transition: "border-bottom-left 200ms ease",
              boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
              zIndex: isEndFocused ? 28 : -2,
              caretColor: isEndFocused ? "white" : "transparent",
            }}
            placeholder="Enter Destination"
          />
          <div
            style={{
              position: "relative",
              zIndex: 20,
              marginTop: "-40px",
              paddingBottom: "10px",
              float: "right",
              right: "16px",
            }}
          >
            {(endID != "" && !forceClose) || forceClose ? (
              <span
                style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}
                onClick={() => {
                  if (showSuggestions[1]) setShowSuggestions([false, false]);
                  else {
                    setEndID("");
                    setEndName("");
                    setTargetType("");
                  }
                }}
              >
                ✕
              </span>
            ) : (
              <span
                style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}
                onClick={() => {
                  setIsEndFocused(true);
                  if (!forceClose)
                    setShowSuggestions([false, !showSuggestions[1]]);
                  else setForceClose(false);
                }}
              >
                ▼
              </span>
            )}
          </div>
          {showSuggestions[1] && (
            <div
              className="scroll-container"
              style={{
                position: "absolute",
                marginTop: "-10%",
                left: 0,
                width: "80%",
                backgroundColor: "white",
                zIndex: -1,
                height: "30vh",
                borderRadius: "16px",
                overflow: "hidden",
                overflowY: "scroll",
                boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ul
                style={{
                  listStyleType: "none",
                  padding: "32px 0 0 0",
                }}
                onMouseEnter={() => setIsEndFocused(true)}
              >
                {items
                  .filter(
                    (node) =>
                      node.shortName
                        .toLowerCase()
                        .includes(endName.toLowerCase()) ||
                      node.longName
                        .toLowerCase()
                        .includes(endName.toLowerCase()) ||
                      node.nodeID
                        .toLowerCase()
                        .includes(endName.toLowerCase()) ||
                      node.nodeType
                        .toLowerCase()
                        .includes(endName.toLowerCase()),
                  )
                  .map((node) => (
                    <li
                      onMouseEnter={() => {
                        onHoverNode(node);
                      }}
                      onMouseLeave={() => {
                        onHoverNode(null);
                      }}
                      onClick={() => {
                        onSelectEnd(
                          node.nodeID,
                          {} as React.SyntheticEvent<HTMLElement>,
                        );
                        setEndID(node.nodeID);
                        if (node.longName.length > 30)
                          setEndName(node.shortName);
                        else setEndName(node.longName);
                        setShowSuggestions([false, true]);
                      }}
                      style={{
                        /*                      backgroundColor:
                                                  hoveredItem == node.nodeID
                                                    ? "rgba(255, 255, 255, 0.1)"
                                                    : "white",*/
                        padding: "8px",
                        cursor: "pointer",
                        marginBottom: "2px",
                        marginTop: "2px",

                        transition: "background-color 0.1s",
                      }}
                    >
                      {node.longName}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        {startID != "" && endName === "" && (
          <div
            style={{
              position: "relative",
              zIndex: -12,
              display: "flex",
              gap: "8px",
            }}
          >
            {/*<span*/}
            {/*    style={{*/}
            {/*        border: "5px solid rgba(0, 0, 0, 0.1)",*/}
            {/*        borderRadius: "16px",*/}
            {/*        marginTop: "8px",*/}
            {/*        paddingLeft: "8px",*/}
            {/*        paddingRight: "8px",*/}

            {/*        fontSize: "15px",*/}
            {/*        outline: "none",*/}
            {/*        width: "60%",*/}
            {/*        backgroundColor: "#8B2121",*/}
            {/*        color: "white",*/}
            {/*        transition: "border-bottom-left 200ms ease",*/}
            {/*        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",*/}
            {/*        cursor: "pointer",*/}
            {/*    }}*/}
            {/*    onClick={() => setTargetType("REST")}*/}
            {/*>*/}
            {/*  Restroom*/}
            {/*</span>*/}
            {/*  <span*/}
            {/*      style={{*/}
            {/*    border: "5px solid rgba(0, 0, 0, 0.1)",*/}
            {/*    borderRadius: "16px",*/}
            {/*    marginTop: "8px",*/}
            {/*    paddingLeft: "8px",*/}
            {/*    paddingRight: "8px",*/}

            {/*    fontSize: "15px",*/}
            {/*    outline: "none",*/}
            {/*    width: "60%",*/}
            {/*    backgroundColor: "#8B2121",*/}
            {/*    color: "white",*/}
            {/*    transition: "border-bottom-left 200ms ease",*/}
            {/*    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",*/}
            {/*    cursor: "pointer",*/}
            {/*  }}*/}
            {/*  onClick={() => setTargetType("EXIT")}*/}
            {/*>*/}
            {/*      <svg ></svg>*/}
            {/*  Exit*/}
            {/*</span>*/}
            {/*<span*/}
            {/*  style={{*/}
            {/*    border: "5px solid rgba(0, 0, 0, 0.1)",*/}
            {/*    borderRadius: "16px",*/}
            {/*    marginTop: "8px",*/}
            {/*    paddingLeft: "8px",*/}
            {/*    paddingRight: "8px",*/}

            {/*    fontSize: "15px",*/}
            {/*    outline: "none",*/}
            {/*    width: "60%",*/}
            {/*    backgroundColor: "#8B2121",*/}
            {/*    color: "white",*/}
            {/*    transition: "border-bottom-left 200ms ease",*/}
            {/*    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",*/}
            {/*    cursor: "pointer",*/}
            {/*  }}*/}
            {/*  onClick={() => setTargetType("ELEV")}*/}
            {/*>*/}
            {/*  Elevator*/}
            {/*</span>*/}
            {/*<span*/}
            {/*  style={{*/}
            {/*    border: "5px solid rgba(0, 0, 0, 0.1)",*/}
            {/*    borderRadius: "16px",*/}
            {/*    marginTop: "8px",*/}
            {/*    paddingLeft: "8px",*/}
            {/*    paddingRight: "8px",*/}

            {/*    fontSize: "15px",*/}
            {/*    outline: "none",*/}
            {/*    width: "60%",*/}
            {/*    backgroundColor: "#8B2121",*/}
            {/*    color: "white",*/}
            {/*    transition: "border-bottom-left 200ms ease",*/}
            {/*    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",*/}
            {/*    cursor: "pointer",*/}
            {/*  }}*/}
            {/*  onClick={() => setTargetType("INFO")}*/}
            {/*>*/}
            {/*  Info Desk*/}
            {/*</span>*/}
            <ThemeProvider theme={theme}></ThemeProvider>
            <Chip
              icon={<WcIcon />}
              label="Restroom"
              onClick={() => setTargetType("REST")}
              color="primary"
              clickable
            />

            <Chip
              icon={<ExitToAppIcon />}
              label="Exit"
              onClick={() => setTargetType("EXIT")}
              color="primary"
              sx={{ color: "text.primary" }}
              clickable
            />
            <Chip
              icon={<ElevatorIcon />}
              label="Elevator"
              onClick={() => setTargetType("ELEV")}
              color={"primary"}
              clickable
            />

            <Chip
              icon={<InfoIcon />}
              label="Info"
              onClick={() => setTargetType("INFO")}
              color={"primary"}
              clickable
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default StartEndSelect;
