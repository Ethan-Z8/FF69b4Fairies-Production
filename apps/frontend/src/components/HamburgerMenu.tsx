import React, { useState } from "react";
import "../styling/HamburgerMenu.css";

function HamburgerMenu({ menuItems }: { menuItems: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="hamburger-menu" onClick={toggleDropdown}>
      <div className="hamburger-icon">☰</div>
      {isOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
