import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TextDirectionRoute = () => {
  const [directions, setDirections] = useState<string[]>([]);
  const { startLocation, endLocation } = useParams<{
    startLocation: string;
    endLocation: string;
  }>();

  useEffect(() => {
    if (startLocation && endLocation) {
      const getDirections = async () => {
        try {
          const res = await axios.get("/api/map/getTextDirections", {
            params: { start: startLocation, end: endLocation },
          });
          setDirections(res.data);
        } catch (err) {
          console.error("Error fetching directions:", err);
        }
      };
      getDirections();
    }
  }, [startLocation, endLocation]);

  return (
    <div
      className="scroll-container"
      style={{
        backgroundColor: "white",
        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
        overflowY: "auto",
        width: "80%",
        height: "75vh",
      }}
    >
      <ul>
        {directions.map((direction, index) => (
          <li style={{ listStyleType: "none" }} key={index}>
            {direction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextDirectionRoute;
