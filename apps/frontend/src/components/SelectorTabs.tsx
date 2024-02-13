import React from "react";
import "../styling/SelectorTabs.css";

interface SelectorTabsProps {
  mapIndex: number;
  onMapSelect: (index: number) => void;
  tabNames: string[];
}

const SelectorTabs: React.FC<SelectorTabsProps> = ({
  mapIndex,
  onMapSelect,
  tabNames,
}) => {
  const handleTabClick = (index: number) => {
    onMapSelect(index);
  };

  return (
    <div className="selector-tabs">
      {tabNames.map((tab, index) => (
        <div
          key={index}
          className={`individual ${mapIndex === index ? "active" : ""}`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default SelectorTabs;
