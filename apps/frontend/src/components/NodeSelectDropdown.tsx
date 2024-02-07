import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const getAllNodes = async () => {
      try {
        const allNodes = await axios.get(`/api/map/allTemp`);
        const nodesData: Node[] = Object.values(allNodes.data);
        const namesData = nodesData.map((node) => node.shortName);
        setItems(namesData);
      } catch (error) {
        console.error("Error fetching map nodes:", error);
      }
    };
    getAllNodes();
  }, []);

  const handleSelect = (
    item: string,
    event: React.SyntheticEvent<HTMLElement>,
  ) => {
    setSelectedItem(item);
    onSelect(item, event);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id={`dropdown-${label}`}>
        {selectedItem || label}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder={`Search ${label}...`}
          onChange={handleSearch}
          value={searchTerm}
        />
        {filteredItems.map((item, index) => (
          <Dropdown.Item
            key={index}
            eventKey={item}
            onSelect={(event) => handleSelect(item, event)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NodeSelectDropdown;
