import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

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
  //const [showSuggestions, setShowSuggestions] = useState([false, false]);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map`);
        setNodes(allNodes.data);
        const nodesData: Node[] = Object.values(allNodes.data);

        const filteredNodes = nodesData.filter(
          (node) => node.nodeType != "HALL",
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
    } else {
      setStartName("");
    }
  }, [start, startID, nodes]);

  useEffect(() => {
    if (end && nodes[end]) {
      setEndName(nodes[end].longName);
    } else {
      setEndName("");
    }
  }, [end, endID, nodes]);

  useEffect(() => {
    const handleMouseDown = () => {
      if (!isFocused) {
        //setShowSuggestions([false, false]);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isFocused]);

  const handleFocusStart = () => {
    setIsFocused(true);
    //setShowSuggestions([true, false]);
  };

  const handleFocusEnd = () => {
    setIsFocused(true);
    //setShowSuggestions([false, true]);
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
        node.nodeID == e.target.value ||
        node.shortName == e.target.value ||
        node.longName == e.target.value,
    );

    if (results.length == 1) {
      setTerm(results[0].nodeID);
      if (inputRef.current) {
        inputRef.current.value = results[0].nodeID;
      }

      onSelect(results[0].nodeID, {} as React.SyntheticEvent<HTMLElement>);
    } else {
      setTerm("");
    }

    //if (startID != '' && endID != '')

    //  setShowSuggestions([false, false]);

    //    setShowSuggestions([false, false]);
  };

  // const handleSuggestionClick = (
  //   value: string,
  //   onSelect: (item: string, event: React.SyntheticEvent<HTMLElement>) => void,
  //   setTerm: React.Dispatch<React.SetStateAction<string>>
  // ) => {
  //
  //   setTerm(value);
  //   setShowSuggestions([false, false]);
  //   if (inputRef.current) {
  //     inputRef.current.value = value;
  //   }
  //   onSelect(value, {} as React.SyntheticEvent<HTMLElement>);
  // };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      style={{
        position: "fixed",
        borderRadius: "16px",
        left: "8px",
        top: "112px",
        zIndex: 30,
        width: "20%",
        backgroundColor: "transparent",
        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div style={{ position: "relative" }}>
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
          }}
        />
        {startName && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "white",
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
      <div style={{ position: "relative" }}>
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
          }}
        />
        {endName && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "white",
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

/*

<div
  className="nodeSelectContainer"
  style={{display: "flex", flexDirection: "column"}}
>
  <div style={{display: "flex", alignItems: "center"}}>
    <span style={{width: "50px"}}>Start:</span>
    <NodeSelectDropdown
      label={shortNames.start}
      onSelect={handleStartSelect}
    />
  </div>
  <div style={{display: "flex", alignItems: "center"}}>
    <span style={{width: "50px"}}>End:</span>
    <NodeSelectDropdown
      label={shortNames.end}
      onSelect={handleEndSelect}
    />
  </div>
  <Button onClick={clearSearch}>Clear</Button>
</div>*/
