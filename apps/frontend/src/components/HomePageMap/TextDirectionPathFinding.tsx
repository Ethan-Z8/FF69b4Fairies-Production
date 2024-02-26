import axios from "axios";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface TextDirectionPathProps {
  start: string;
  end: string;
  forceClose: boolean;
  resetPath: boolean;
}

const TextDirectionPathFinding: React.FC<TextDirectionPathProps> = ({
  start,
  end,
  forceClose,
  resetPath,
}) => {
  const [floorDirections, setFloorDirections] = useState<{
    [floor: string]: string[];
  }>({});

  useEffect(() => {
    if (resetPath) {
      // Reset directions if resetPath is true
      setFloorDirections({});
    } else {
      // Fetch and update directions if resetPath is false
      const getDirections = async () => {
        try {
          const res = await axios.get("/api/map/getTextDirections", {
            params: { start, end },
          });
          preprocessDirections(res.data);
        } catch (err) {
          console.error("Directions:", err);
        }
      };
      getDirections();
    }
  }, [start, end, resetPath]);

  const preprocessDirections = (directions: string[]) => {
    const floorDirectionMap: { [floor: string]: string[] } = {};
    let currentFloor = "";

    directions.forEach((direction) => {
      let floor = direction.slice(-2);
      let isElevator = false;

      if (floor.trim().match(/L\d{1,2}|0[1-3]/)) {
        floor = floor.trim();
      } else {
        isElevator = true;
      }

      if (floor !== currentFloor) {
        currentFloor = floor;
        floorDirectionMap[floor] = [
          isElevator ? ` ` : `Directions for current floor ${floor}`,
        ];
      }
      floorDirectionMap[floor].push(direction);
    });

    setFloorDirections(floorDirectionMap);
  };

  return (
    <div
      className="scroll-container"
      style={{
        backgroundColor: "white",
        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        overflowY: "auto",
        width: "80%",
        height: start !== "" && end !== "" && !forceClose ? "75vh" : 0,
      }}
    >
      {Object.entries(floorDirections).map(([floor, directions], index) => (
        <>
          {floor.includes(" ") ? (
            <Typography
              key={index}
              sx={{
                backgroundColor: "#f4f4f4",
                padding: "16px",
                textAlign: "start",
              }}
            >{`Elevator to floor ${floor}`}</Typography>
          ) : (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ backgroundColor: "#f4f4f4" }}
              >
                <Typography>{`Floor: ${floor}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {directions.map((direction, index) => (
                    <li style={{ listStyleType: "none" }} key={index}>
                      {direction}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      ))}
    </div>
  );
};

export default TextDirectionPathFinding;
