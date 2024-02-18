import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./StartEndSelect.css";

interface Node {
  nodeID: string;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

interface NodeSelectProps {
  start: string;
  end: string;
  onSelectStart: (
    item: string,
    event: React.SyntheticEvent<HTMLElement>,
  ) => void;
  onSelectEnd: (item: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

const StartEndSelect: React.FC<NodeSelectProps> = ({
  start,
  end,
  onSelectStart,
  onSelectEnd,
}) => {
  const [startID, setStartID] = useState(start);
  const [endID, setEndID] = useState(end);
  const [startName, setStartName] = useState("");
  const [endName, setEndName] = useState("");
  const [nodes, setNodes] = useState<{ [key: string]: Node }>({});
  const [items, setItems] = useState<Node[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [bothIDsSet, setBothIDsSet] = useState(false); // Track if both start and end IDs are set
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
      setStartName(nodes[start].longName);
      setStartID(start);
    } else {
      setStartName("");
      setStartID("");
    }
  }, [start, nodes]);

  useEffect(() => {
    if (end && nodes[end]) {
      setEndName(nodes[end].longName);
      setEndID(end);
    } else {
      setEndName("");
      setEndID("");
    }
  }, [end, nodes]);

  useEffect(() => {
    const handleMouseDown = () => {
      if (!isFocused) {
        setShowSuggestions([false, false]);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isFocused]);

  useEffect(() => {
    // Check if both startID and endID are set
    if (startID != "" && endID != "") {
      setBothIDsSet(true);
      console.log("asdfkalsd");
    } else {
      setBothIDsSet(false);
      console.log("AJFLKSAJKF");
    }
  }, [startID, endID]);

  const handleFocusStart = () => {
    setIsFocused(true);
    setShowSuggestions([true, false]);
  };

  const handleFocusEnd = () => {
    setIsFocused(true);
    setShowSuggestions([false, true]);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
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
          onChange={(e) =>
            handleSearch(e, onSelectStart, setStartID, setStartName)
          }
          onFocus={handleFocusStart}
          style={{
            border: "0px solid #ccc",
            borderTopRightRadius: "16px",
            borderTopLeftRadius: "16px",
            paddingLeft: "16px",
            fontSize: "18px",
            outline: "none",
            width: "100%",
            minHeight: "48px",
            backgroundColor: "#0E6244",
            color: "white",
            boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.4)",
          }}
        />
        {showSuggestions[0] && startName && (
          <div
            className="scroll-container"
            style={{
              position: "absolute",
              top: "24px",
              left: 0,
              width: "75%",
              backgroundColor: "white",
              zIndex: -1,
              maxHeight: "600%",
              borderRadius: "16px",
              overflow: "auto",
            }}
          >
            <ul>
              {items
                .filter((node) =>
                  node.shortName
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
                      setStartName(node.shortName);
                    }}
                  >
                    {node.longName}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          value={endName}
          onChange={(e) => handleSearch(e, onSelectEnd, setEndID, setEndName)}
          onFocus={handleFocusEnd}
          style={{
            border: "0px solid #ccc",
            borderBottomRightRadius: "16px",
            borderBottomLeftRadius: "16px",
            paddingLeft: "16px",
            fontSize: "18px",
            outline: "none",
            width: "100%",
            minHeight: "48px",
            backgroundColor: "#8B2121",
            color: "white",
            marginTop: bothIDsSet ? "calc(100vh - 216px)" : 0,
            transition: "margin-top 0.5s ease",
            boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.4)",
            zIndex: 26,
          }}
        />
        {showSuggestions[1] && endName && (
          <div
            className="scroll-container"
            style={{
              position: "absolute",
              top: "72px",
              left: 0,
              width: "75%",
              backgroundColor: "white",
              zIndex: -1,
              maxHeight: "300%",
              borderRadius: "16px",
              overflow: "auto",
            }}
          >
            <ul>
              {items
                .filter(
                  (node) =>
                    node.shortName
                      .toLowerCase()
                      .includes(endName.toLowerCase()) ||
                    node.longName
                      .toLowerCase()
                      .includes(endName.toLowerCase()) ||
                    node.nodeID.toLowerCase().includes(endName.toLowerCase()),
                )
                .map((node) => (
                  <li
                    key={node.nodeID}
                    onClick={() => {
                      onSelectEnd(
                        node.nodeID,
                        {} as React.SyntheticEvent<HTMLElement>,
                      );
                      setEndName(node.longName);
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
