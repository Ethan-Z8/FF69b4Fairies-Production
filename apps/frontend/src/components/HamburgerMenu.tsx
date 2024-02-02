import React, { useState, useRef, useEffect } from "react";
import "../styling/HamburgerMenu.css";

interface MenuItem {
  name: string;
  index: number;
}

interface HamburgerMenuProps {
  menuItems: MenuItem[];
  onMenuItemClick: (index: number) => void;
  selectedTabIndex: number;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  menuItems,
  onMenuItemClick,
  selectedTabIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (index: number) => {
    onMenuItemClick(index);
    setIsOpen(false);
  };

  // Update dropdown width
  const updateDropdownWidth = () => {
    if (menuRef.current) {
      const menuWidth = menuRef.current.offsetWidth;
      const dropdownMenu = document.querySelector(
        ".dropdown-menu",
      ) as HTMLDivElement;
      if (dropdownMenu) {
        dropdownMenu.style.width = `${menuWidth}px`;
      }
    }
  };

  useEffect(() => {
    // Update width when dropdown opens/closes
    updateDropdownWidth();

    // Update width on window resize
    window.addEventListener("resize", updateDropdownWidth);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", updateDropdownWidth);
    };
  }, [isOpen]); // Dependency array includes isOpen to re-calculate on open/close

  return (
    <div className="hamburger-menu" onClick={toggleDropdown} ref={menuRef}>
      <div className={`hamburger-icon ${isOpen ? "close" : ""}`}>
        {isOpen ? "×" : "☰"}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${selectedTabIndex === item.index ? "active" : ""}`}
              onClick={() => handleMenuClick(item.index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
