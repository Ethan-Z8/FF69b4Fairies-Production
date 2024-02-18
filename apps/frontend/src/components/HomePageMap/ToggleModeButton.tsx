import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export interface ToggleModeButtonProps {
  currentMode: string;
  setCurrentMode: (mode: string) => void;
}

export function ToggleModeButton({
  currentMode,
  setCurrentMode,
}: ToggleModeButtonProps) {
  return (
    <ToggleButtonGroup
      value={currentMode}
      onChange={(_, s) => setCurrentMode(s)}
    >
      <ToggleButton value="Navigation">Navigation</ToggleButton>
      <ToggleButton value="Request">Request</ToggleButton>
    </ToggleButtonGroup>
  );
}
