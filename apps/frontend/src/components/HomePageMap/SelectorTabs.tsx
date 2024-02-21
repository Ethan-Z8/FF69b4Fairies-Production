import React, { useEffect, useState } from "react";
import "../../styling/SelectorTabs.css";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import axios from "axios";

interface SelectorTabsProps {
  mapIndex: number;
  onMapSelect: (index: number) => void;
  tabNames: string[];
  start: string;
  end: string;
}

const SelectorTabs: React.FC<SelectorTabsProps> = ({
  mapIndex,
  onMapSelect,
  tabNames,
  start,
  end,
}) => {
  const [activeFloor, setActiveFloor] = useState<string[]>([]);

  useEffect(() => {
    const getActiveFloors = async () => {
      try {
        const res = await axios.get("/api/map/getActiveFloors", {
          params: { start, end },
        });
        setActiveFloor(res.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    getActiveFloors();
  }, [start, end]);

  const floorMap = new Map<string, string>();
  floorMap.set("F1", "1");
  floorMap.set("F2", "2");
  floorMap.set("F3", "3");
  floorMap.set("LL1", "L1");
  floorMap.set("LL2", "L2");

  const isFloorActive = (floor: string) => {
    const prefixedFloor = floorMap.get(floor);
    return prefixedFloor ? activeFloor.includes(prefixedFloor) : false;
  };

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
        right: 20,
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
                padding: "10px 20px",
                "&.MuiButton-root": {
                  border: "5px",
                  backgroundColor: "#042c5c",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  boxShadow: 5,
                  fontSize: "20px",
                },
                "&.active": {
                  color: "black",
                  backgroundColor: "lightblue",
                  transform: "none",
                },

                "&.individual:first-of-type": {
                  borderRadius: "16px 16px 0px 0px",
                },
                "&.individual:last-of-type": {
                  borderRadius: "0px 0px 16px 16px",
                },
              }}
            >
              {isFloorActive(tab) && (
                <>
                  <img
                    className="arrowImage"
                    src="https://static.thenounproject.com/png/634840-200.png"
                    alt={"Arrow Image "}
                  />
                </>
              )}
              {tab}
            </Button>
          ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SelectorTabs;
