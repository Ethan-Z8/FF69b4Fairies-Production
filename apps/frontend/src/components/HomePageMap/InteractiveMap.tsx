import { NavigationMode } from "./NavigationMode.tsx";
import { ToggleModeButton } from "./ToggleModeButton.tsx";
import { useState } from "react";

export function InteractiveMap() {
  const [currentMode, setCurrentMode] = useState("Navigation");

  return (
    <div style={{ position: "relative", width: "100vw" }}>
      {currentMode === "Navigation" ? <NavigationMode /> : <div />}
      <div style={{ position: "absolute", top: "2rem", right: "2rem" }}>
        <ToggleModeButton
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
        />
      </div>
    </div>
  );
}
