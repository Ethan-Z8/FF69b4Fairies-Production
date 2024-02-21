import { ToggleButtonGroup, ToggleButton, Button } from "@mui/material";

export interface ToggleModeButtonProps {
  currentMode: string;
  setCurrentMode: (mode: string) => void;
}

export function ToggleModeButton({
  currentMode,
  setCurrentMode,
}: ToggleModeButtonProps) {
  function handleChange(e: React.MouseEvent<HTMLElement>, newMode: string) {
    console.log(newMode);
    setCurrentMode(newMode);
  }
  return (
    <ToggleButtonGroup
      color="primary"
      value={currentMode}
      exclusive
      onChange={handleChange}
      style={{
        borderRadius: "16px",
      }}
    >
      <ToggleButton
        value="Navigation"
        component={Button}
        variant="contained"
        color="primary"
        style={{
          borderTopLeftRadius: "11px",
          borderBottomLeftRadius: "11px",
          border: "5px solid rgba(0, 0, 0, 0.2)",
          backgroundColor: "#0E6244",
          color: "white",
          opacity: currentMode == "Navigation" ? "100%" : "40%",
        }}
      >
        Navigation
      </ToggleButton>
      <ToggleButton
        value="Request"
        component={Button}
        variant="contained"
        color="primary"
        style={{
          borderTopRightRadius: "11px",
          borderBottomRightRadius: "11px",
          border: "5px solid rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ff69b4",
          color: "white",
          opacity: currentMode == "Request" ? "100%" : "40%",
        }}
      >
        Request
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
