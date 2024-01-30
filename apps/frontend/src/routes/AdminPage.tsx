import React, { useEffect } from "react";
import "../styling/homePage.css";
import LL1Map from "../components/Map.tsx";
import { SelectorTabs } from "../components/SelectorTabs.tsx";

export const Desktop = () => {
  return (
    <div className="home-frame">
      <div className="Top-Bar">
        <SelectorTabs statusOfPage={"LOGOUT"} />
      </div>
      <LL1Map />
    </div>
  );
};

function AdminPage() {
  useEffect(() => {
    document.title = "admin page";
    console.log(`rendered component`);
  });

  return (
    <div className="w-100 h-100 d-flex flex-column overflow-auto">
      <Desktop />
    </div>
  );
}

export default AdminPage;
