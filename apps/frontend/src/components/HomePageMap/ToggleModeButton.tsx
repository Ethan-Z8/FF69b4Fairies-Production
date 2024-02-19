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
    >
      <ToggleButton
        value="Navigation"
        component={Button}
        variant="contained"
        color="primary"
      >
        Navigation
      </ToggleButton>
      <ToggleButton
        value="Request"
        component={Button}
        variant="contained"
        color="primary"
      >
        Request
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
