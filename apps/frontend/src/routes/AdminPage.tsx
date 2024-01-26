import React, { useEffect } from "react";

import "../style/homePage.css";

import HospitalLogo from "../assets/image-1.png";
import LoginButton from "../components/LoginButton.tsx";
import LL1Map from "../components/Map.tsx";

export const Desktop = () => {
  return (
    <div className="home-frame">
      <LL1Map />

      <div className="Top-Banner" />
      <img className="Hospital-Logo" alt="Image" src={HospitalLogo} />

      <div className="Hospital-Copyright">
        © Brigham and Women&#39;s hospital
      </div>

      <LoginButton />
    </div>
  );
};

function AdminPage() {
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

export { AdminPage };
