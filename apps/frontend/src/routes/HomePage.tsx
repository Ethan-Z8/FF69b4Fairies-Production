import React, { useEffect } from "react";
import "../styling/homePage.css";
import LL1Map from "../components/Map.tsx";
import { SelectorTabs } from "../components/SelectorTabs.tsx";

export const Desktop = () => {
  return (
    <div className="home-frame">
      <div className="Top-Bar">
        <SelectorTabs statusOfPage={"LOGIN"} />
      </div>
      <LL1Map />
    </div>
  );
};

function HomePage() {
  useEffect(() => {
    document.title = "home page";
    console.log(`rendered component`);
  });

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop />
    </div>
  );
}

export default HomePage;
