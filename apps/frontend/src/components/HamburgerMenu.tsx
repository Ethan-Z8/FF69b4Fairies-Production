import React, { useState } from "react";
import "../styling/HamburgerMenu.css";

interface MenuItem {
  name: string;
  index: number;
}

interface HamburgerMenuProps {
  menuItems: MenuItem[];
  onMenuItemClick: (index: number) => void;
  selectedTabIndex: number; // Declaration of the property
}

// Updated function signature to include selectedTabIndex
function HamburgerMenu({
  menuItems,
  onMenuItemClick,
  selectedTabIndex,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMenuClick = (index: number) => {
    onMenuItemClick(index);
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu" onClick={toggleDropdown}>
      <div className={`hamburger-icon ${isOpen ? "close" : ""}`}>
        {isOpen ? "×" : "☰"}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item, index) => (
            <div
              key={index} // Use index as key instead of item.index to ensure uniqueness
              className={`menu-item ${selectedTabIndex === item.index ? "active" : ""}`} // Highlight the selected tab
              onClick={() => handleMenuClick(item.index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
