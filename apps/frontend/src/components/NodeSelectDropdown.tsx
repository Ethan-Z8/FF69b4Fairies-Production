import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Form, ListGroup } from "react-bootstrap";

interface Node {
  nodeID: string;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

interface NodeSelectProps {
  label: string;
  onSelect: (item: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

const NodeSelectDropdown: React.FC<NodeSelectProps> = ({ label, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Node[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  let focusTimer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map/allTemp`);
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

    setSearchTerm(label);
  }, [label]);

  const handleFocus = () => {
    clearTimeout(focusTimer);
    setShowSuggestions(true);
    focusTimer = setTimeout(() => {
      setShowSuggestions(false);
    }, 2000);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    clearTimeout(focusTimer);
    setShowSuggestions(true);
    focusTimer = setTimeout(() => {
      setShowSuggestions(false);
    }, 2000);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchTerm(value);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.value = value;
    }
    onSelect(value, {} as React.SyntheticEvent<HTMLElement>);
  };

  return (
    <div style={{ zIndex: 25, position: "relative" }}>
      <Form.Control
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={label}
      />
      {showSuggestions && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            maxHeight: "40vh",
            overflowY: "auto",
          }}
        >
          <div style={{ zIndex: 30 }}>
            <ListGroup>
              {items
                .filter((node) =>
                  node.shortName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
                )
                .map((node) => (
                  <ListGroup.Item
                    key={node.nodeID}
                    onClick={() => handleSuggestionClick(node.shortName)}
                    style={{ cursor: "pointer" }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {node.longName}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeSelectDropdown;
