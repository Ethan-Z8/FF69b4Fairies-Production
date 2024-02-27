import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./StartEndSelect.css";

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
  start?: string;
  onSelectStart: (
    item: string,
    event: React.SyntheticEvent<HTMLElement>,
  ) => void;
  onHoverNode?: (node: Node | null) => void;
}

//const findablePlaces = ["Exit", "Restroom", "Info Desk", "Elevator", "Shop"];
//const findableTypes = ["EXIT", "INFO", "REST", "ELEV", "RETL", "BATH", "SERV"];

const StartEndSelect: React.FC<NodeSelectProps> = ({
  start,
  onSelectStart,
}) => {
  const [startID, setStartID] = useState(start ? start : "");
  const [startName, setStartName] = useState("");
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  const [items, setItems] = useState<Node[]>([]);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      if (!isStartFocused) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isStartFocused]);

  useEffect(() => {
    setShowSuggestions(false);

    if (startID == "") {
      setStartName("");
    }
  }, [startID]);

  const handleFocusStart = () => {
    setIsStartFocused(true);
  };

  const handleMouseLeave = () => {
    setIsStartFocused(false);
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
              setShowSuggestions(true);
            }}
            onFocus={handleFocusStart}
            onClick={() => setShowSuggestions(true)}
            style={{
              border: "5px solid rgba(0, 0, 0, 0.1)",
              borderTopRightRadius: "16px",
              borderTopLeftRadius: "16px",
              borderBottomRightRadius: startName == "" ? "16px" : "4px",
              borderBottomLeftRadius: startName == "" ? "16px" : "4px",
              paddingLeft: "16px",
              fontSize: "18px",
              outline: "none",
              width: "100%",
              minHeight: "48px",
              backgroundColor: "#012d5a",
              color: "white",
              boxShadow: "1px -1px 2px rgba(0, 0, 0, 0.2)",
              caretColor: isStartFocused ? "white" : "transparent",
              zIndex: 20,
            }}
            placeholder="Pick a location to view Services"
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
                  onSelectStart("", {} as React.SyntheticEvent<HTMLElement>);
                }}
              >
                ✕
              </span>
            ) : (
              <span
                style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}
                onClick={() => {
                  setIsStartFocused(true);
                  setShowSuggestions(true);
                }}
              >
                ▼
              </span>
            )}
          </div>
          {showSuggestions && (
            <div
              className="scroll-container"
              style={{
                position: "absolute",
                left: 0,
                top: "24px",
                backgroundColor: "white",
                width: "100%",
                zIndex: -1,
                border: "5px solid rgba(0, 0, 0, 0.1)",

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

                        setShowSuggestions(true);
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
            {/*
            <div
              onClick={() => {
                onSelectStart("", {} as React.SyntheticEvent<HTMLElement>);
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
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartEndSelect;
