import React from "react";
import "../styling/SelectorTabs.css";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

interface SelectorTabsProps {
  mapIndex: number;
  onMapSelect: (index: number) => void;
  tabNames: string[];
}

const SelectorTabs: React.FC<SelectorTabsProps> = ({
  mapIndex,
  onMapSelect,
  tabNames,
}) => {
  const handleTabClick = (index: number) => {
    onMapSelect(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: "transparent",
        boxShadow: 0,
      }}
    >
      <ToggleButtonGroup
        variant="contained"
        orientation={"vertical"}
        aria-label={"Vertical Button group"}
        sx={{
          boxShadow: "none",
        }}
      >
        {/* Reverse the order of tabNames */}
        {tabNames
          .slice()
          .reverse()
          .map((tab, index) => (
            <Button
              key={index}
              className={`individual ${mapIndex === tabNames.length - 1 - index ? "active" : ""}`}
              onClick={() => handleTabClick(tabNames.length - 1 - index)}
              sx={{
                "&.MuiButton-root": {
                  width: "100%",
                  height: "3rem",
                  backgroundColor: "#042c5c",
                  borderRadius: "6px",
                  border: "5px solid",
                  gap: 10,
                  transition:
                    "background-color 0.3s ease, color 0.3s ease,  transform .3s ease;",
                  boxShadow: 5,
                  borderColor: "white",
                  margin: ".5rem",
                },
                "&.active": {
                  borderColor: "#f4bc3c",
                  color: "white",
                  backgroundColor: "#042c5c",
                  transform: "translate(-40px)",
                  justifyContent: "center",
                },
                "&:hover": {
                  backgroundColor: "hsl(230, 100%, 15%)",
                },
              }}
            >
              {tab}
            </Button>
          ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SelectorTabs;
