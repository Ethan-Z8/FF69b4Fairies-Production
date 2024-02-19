import axios from "axios";
import React, {
  Dispatch,
  useEffect,
  useState,
  useRef,
  SetStateAction,
} from "react";
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
  start: string;
  end: string;
  onSelectStart: (
    item: string,
    event: React.SyntheticEvent<HTMLElement>,
  ) => void;
  onSelectEnd: (item: string, event: React.SyntheticEvent<HTMLElement>) => void;
  onHoverNode: Dispatch<SetStateAction<Node | null>>;
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
      setStartName(nodes[start].shortName);
      setStartID(start);
    } else {
      setStartName("");
      setStartID("");
    }
  }, [start, nodes]);

  useEffect(() => {
    if (end && nodes[end]) {
      setEndName(nodes[end].shortName);
      setEndID(end);
    } else {
      setEndName("");
      setEndID("");
    }
  }, [end, nodes]);

  useEffect(() => {
    console.log(isStartFocused, isEndFocused);
    const handleMouseDown = () => {
      //console.log(isStartFocused);
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
    // Check if both startID and endID are set

    if (startID != "" && endID != "") {
      setBothIDsSet(true);

      //console.log("asdfkalsd");
    } else {
      setBothIDsSet(false);

      //console.log("AJFLKSAJKF");
    }
    setShowSuggestions([false, false]);
  }, [startID, endID]);

  const handleFocusStart = () => {
    setIsStartFocused(true);
  };

  const handleFocusEnd = () => {
    setIsEndFocused(true);
  };

  // Modify handleMouseLeave function to reset both focused states
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
          onClick={() => setShowSuggestions([true, false])}
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
            boxShadow: "1px -1px 2px rgba(0, 0, 0, 0.2)",
            caretColor: isStartFocused ? "white" : "transparent",
          }}
        />
        {showSuggestions[0] && (
          <div
            className="scroll-container"
            style={{
              position: "absolute",
              top: "24px",
              left: 0,
              width: "75%",
              backgroundColor: "white",
              zIndex: -1,
              height: "30vh",
              borderRadius: "16px",
              overflow: "auto",
              boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ul style={{ listStyleType: "none", padding: "32px 0 0 0" }}>
              {items
                .filter((node) =>
                  node.shortName
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
                      setStartName(node.shortName);
                    }}
                    style={{
                      backgroundColor: "white",
                      padding: "8px",
                      cursor: "pointer",
                      marginBottom: "4px",
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
      <div>
        <input
          type="text"
          value={endName}
          onChange={(e) => handleSearch(e, onSelectEnd, setEndID, setEndName)}
          onFocus={handleFocusEnd}
          onClick={() => {
            setShowSuggestions([false, true]);
            //console.log("clicked end");
          }}
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
            boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
            zIndex: isEndFocused ? 28 : 26,
          }}
        />
        {showSuggestions[1] && (
          <div
            className="scroll-container"
            style={{
              position: "absolute",
              top: "72px",
              left: 0,
              width: "75%",
              backgroundColor: "white",
              zIndex: -1,
              height: "30vh",
              borderRadius: "16px",
              overflow: "auto",
              caretColor: isEndFocused ? "white" : "transparent",
              boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ul style={{ listStyleType: "none", padding: "32px 0 0 0" }}>
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
                    onMouseEnter={() => {
                      onHoverNode(node);
                    }}
                    onMouseLeave={() => {
                      onHoverNode(null);
                    }}
                    key={node.nodeID}
                    onClick={() => {
                      onSelectEnd(
                        node.nodeID,
                        {} as React.SyntheticEvent<HTMLElement>,
                      );
                      setEndName(node.shortName);
                    }}
                    style={{
                      backgroundColor: "white",
                      padding: "8px",
                      cursor: "pointer",
                      marginBottom: "4px",
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
