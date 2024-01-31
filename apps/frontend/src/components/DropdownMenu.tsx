import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

interface AmountOfItemsNeededForDropDown {
  title: string;
  l1: string;
  l2: string;
  l3: string;
  l4: string;
  variant: string;
  onSelect: (selectedValue: string) => void;
}

function DropdownMenu({
  title,
  l1,
  l2,
  l3,
  l4,
  onSelect,
  variant,
}: AmountOfItemsNeededForDropDown) {
  const [selectedItem, setSelectedItem] = useState(title);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <DropdownButton
      variant={variant}
      id="dropdown-basic-button"
      title={selectedItem}
    >
      <Dropdown.Item href="#" onClick={() => handleItemClick(l1)}>
        {l1}
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => handleItemClick(l2)}>
        {l2}
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => handleItemClick(l3)}>
        {l3}
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => handleItemClick(l4)}>
        {l4}
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownMenu;
