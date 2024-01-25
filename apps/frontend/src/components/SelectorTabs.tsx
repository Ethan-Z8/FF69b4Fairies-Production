import React, { useState } from "react";
import "./SelectorTabs.css";

export function SelectorTabs() {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
    setSelectedTab(tabNumber);
  };
  const floorList = ["GROUND", "LL1", "LL2", "F1", "F2", "F3"];
  return (
    <div className="selector-tabs-container">
      {[0, 1, 2, 3, 4, 5].map((tabIndex) => (
        <div
          key={tabIndex}
          className={`selector-tab ${selectedTab === tabIndex ? "active" : ""}`}
          onClick={() => handleTabClick(tabIndex)}
        >
          {floorList[tabIndex]}
        </div>
      ))}
    </div>
  );
}
