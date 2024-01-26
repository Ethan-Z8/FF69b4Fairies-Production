import React, { useEffect } from "react";

import "../style/homePage.css";

import HospitalLogo from "../assets/image-1.png";
import GoToLogin from "../components/GoToLogin.tsx";
import LL1Map from "../components/Map.tsx";
import { SelectorTabs } from "../components/SelectorTabs.tsx";

export const Desktop = () => {
  return (
    <div className="home-frame">
      <LL1Map />

      <div className="Top-Banner" />
      <img className="Hospital-Logo" alt="Image" src={HospitalLogo} />

      <div className="Hospital-Copyright">
        © Brigham and Women&#39;s hospital
      </div>
      <div className="Bottom-Bar">
        <SelectorTabs />
        <GoToLogin />
      </div>
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
