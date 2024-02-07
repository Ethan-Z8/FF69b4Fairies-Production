import React, { useEffect, useState, useRef } from "react";
import { Form, ListGroup } from "react-bootstrap";
import axios from "axios";

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

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map/allTemp`);
        const nodesData: Node[] = Object.values(allNodes.data);
        setItems(nodesData);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };
    getAllNodes();
  }, []);

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
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
    <div>
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
        <ListGroup>
          {items
            .filter((node) =>
              node.shortName.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((node) => (
              <ListGroup.Item
                key={node.nodeID}
                onClick={() => handleSuggestionClick(node.shortName)}
                style={{ cursor: "pointer" }}
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur on suggestion click
              >
                {node.shortName}
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NodeSelectDropdown;
