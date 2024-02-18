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
  ) => {
    if (items.filter((node) => node.nodeID == e.target.value)) {
      setTerm(e.target.value);
    } else {
      setTerm("");
    }

    //if (startID != '' && endID != '')

    //  setShowSuggestions([false, false]);

    setTerm(e.target.value);

    //    setShowSuggestions([false, false]);

    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }

    onSelect(e.target.value, {} as React.SyntheticEvent<HTMLElement>);

    if (items.length > 0) {
      setStartName(nodes[startID].longName);
      setEndName(nodes[endID].longName);
    }
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
    <div onMouseLeave={handleMouseLeave}>
      <input
        type="text"
        value={startName}
        onChange={(e) => handleSearch(e, onSelectStart, setStartID)}
        onFocus={handleFocusStart}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          fontSize: "16px",
          outline: "none",
          width: "20%",
        }}
      />
      <input
        type="text"
        value={endName}
        onChange={(e) => handleSearch(e, onSelectEnd, setEndID)}
        onFocus={handleFocusEnd}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          fontSize: "16px",
          outline: "none",
          width: "20%",
        }}
      />
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
