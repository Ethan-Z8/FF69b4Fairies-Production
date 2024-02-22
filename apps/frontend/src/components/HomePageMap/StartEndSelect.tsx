import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./StartEndSelect.css";
import TextDirectionPathFinding from "./TextDirectionPathFinding.tsx";

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
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        borderRadius: "16px",
        left: "8px",
        top: "112px",
        zIndex: 20,
        width: "20%",
        backgroundColor: "transparent",
      }}
    >
      <div style={{ position: "relative", zIndex: 21 }}>
        <input
          ref={inputRef}
          type="text"
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
          }}
          placeholder="Start Location"
        />
        <div
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-55%)",
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
          zIndex: -1,
          width: "100%",
        }}
      >
        <div>
          <div
            onClick={() => {
              onSelectStart("", {} as React.SyntheticEvent<HTMLElement>);
              onSelectEnd("", {} as React.SyntheticEvent<HTMLElement>);
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
          <TextDirectionPathFinding
            start={startID}
            end={endID}
            forceClose={forceClose}
          />
        </div>
      </div>
      <div>
        <input
          type="text"
          value={endName}
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
            zIndex: isEndFocused ? 28 : 26,
            caretColor: isEndFocused ? "white" : "transparent",
          }}
          placeholder="Enter Destination"
        />
        <div
          style={{
            position: "absolute",
            right: "16px",
            top: "100%",
            transform: "translateY(-150%)",
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
              top: "80%",
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
                    node.nodeID.toLowerCase().includes(endName.toLowerCase()) ||
                    node.nodeType.toLowerCase().includes(endName.toLowerCase()),
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
                      if (node.longName.length > 30) setEndName(node.shortName);
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
    </div>
  );
};
export default StartEndSelect;