import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TextDirectionRoute = () => {
  const [directions, setDirections] = useState<string[]>([]);
  const { startAndStop } = useParams<{ startAndStop: string }>();

  useEffect(() => {
    if (startAndStop) {
      const [startLocation, endLocation] = startAndStop.split("-");
      const getDirections = async () => {
        try {
          const res = await axios.get("/api/map/getTextDirections", {
            params: { start: startLocation, end: endLocation },
          });
          const processedDirections = res.data.map((direction: string) => {
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

            return modifiedDirection;
          });
          setDirections(processedDirections);
        } catch (err) {
          console.error("Error fetching directions:", err);
        }
      };
      getDirections();
    }
  }, [startAndStop]);

  return (
    <div style={{ width: "100vw", padding: "0", boxSizing: "border-box" }}>
      <ul
        style={{
          padding: 0,
          margin: 0,
          width: "100vw",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        {directions.map((direction, index) => (
          <li
            style={{
              listStyleType: "none",
              backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
              padding: "20px",
              margin: "0 auto", // Centers the list items
              textAlign: "center",
              fontSize: "2rem",
              boxSizing: "border-box", // Ensures padding is included in the width
            }}
            key={index}
          >
            {direction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextDirectionRoute;
