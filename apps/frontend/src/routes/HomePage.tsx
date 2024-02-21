import React, { useState } from "react";
//import { InteractiveMap } from "../components/InteractiveMap.tsx";
import { NavigationMode } from "../components/HomePageMap/NavigationMode.tsx";
import { ServiceRequestMode } from "../components/HomePageMap/ServiceRequestMode.tsx";
import { ToggleModeButton } from "../components/HomePageMap/ToggleModeButton.tsx";
//import {DisplayPath} from "../components/DisplayPath.tsx";

function HomePage() {
  const [mode, setMode] = useState("Navigation");
  // load all the nodes on load of Homepage

  return (
    <div style={{ position: "relative" }}>
      {mode === "Navigation" ? <NavigationMode /> : <ServiceRequestMode />}
      <div style={{ top: 20, right: 20, position: "absolute" }}>
        <ToggleModeButton currentMode={mode} setCurrentMode={setMode} />
      </div>
    </div>
  );
}

export default HomePage;
