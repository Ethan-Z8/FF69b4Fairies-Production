import axios from "axios";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import QRCode from "react-qr-code";

interface TextDirectionPathProps {
  start: string;
  end: string;
  forceClose: boolean;
  resetPath: boolean;
  algo?: string;
}

const TextDirectionPathFinding: React.FC<TextDirectionPathProps> = ({
  start,
  end,
  forceClose,
  resetPath,
  algo,
}) => {
  const [floorDirections, setFloorDirections] = useState<{
    [floor: string]: string[];
  }>({});

  useEffect(() => {
    if (resetPath) {
      setFloorDirections({});
    } else {
      const getDirections = async () => {
        try {
          const res = await axios.get("/api/map/getTextDirections", {
            params: { start, end, algo },
          });
          preprocessDirections(res.data);
        } catch (err) {
          console.error("Directions:", err);
        }
      };
      getDirections();
    }
  }, [start, end, resetPath, algo]);

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

      let modifiedDirection = direction.replace(/ \S+$/, "");

      if (/right/i.test(modifiedDirection)) {
        modifiedDirection += " ➡️";
      } else if (/left/i.test(modifiedDirection)) {
        modifiedDirection += " ⬅️";
      } else if (/forward/i.test(modifiedDirection)) {
        modifiedDirection += " ⬆️";
      }

      if (/stairs/i.test(modifiedDirection)) {
        modifiedDirection += " 🚶‍♂️";
      } else if (/elevator/i.test(modifiedDirection)) {
        modifiedDirection += " 🚶";
      }

      floorDirectionMap[floor].push(modifiedDirection);
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
        height: start !== "" && end !== "" && !forceClose ? "65vh" : 0,
      }}
    >
      {start && end && (
        <div
          className={"qrCodeContainer"}
          style={{
            backgroundColor: "white",
            display: "grid",
            justifyItems: "center",
            paddingBottom: "15px",
          }}
        >
          <h4
            style={{
              fontSize: "20px",
              padding: "20px",
              textAlign: "center",
              fontFamily: "inherit",
              margin: "0px",
            }}
          >
            Scan QR Code for directions
          </h4>
          <QRCode
            style={{
              display: "absolute",
              justifyContent: "center",
              width: "60%",
              height: "100%",
              paddingBottom: "10px",
            }}
            value={`${window.location.href}directions/${start}-${end}`}
          />
        </div>
      )}

      {Object.entries(floorDirections).map(([floor, directions]) => (
        <React.Fragment key={floor}>
          {floor.includes(" ") ? (
            <Typography
              sx={{
                backgroundColor: "#f4f4f4",
                padding: "16px",
                textAlign: "start",
              }}
            >{`Elevator to floor ${floor}`}</Typography>
          ) : (
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ backgroundColor: "#f4f4f4" }}
              >
                <Typography>{`Floor: ${floor}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {directions.map((direction, index) => (
                    <li
                      style={{ listStyleType: "none" }}
                      key={`${floor}-${index}`}
                    >
                      {direction}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextDirectionPathFinding;
