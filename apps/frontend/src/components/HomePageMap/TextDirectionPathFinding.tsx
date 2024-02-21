import axios from "axios";
import React, { useEffect, useState } from "react";

interface TextDirectionPathProps {
  start: string;
  end: string;
}

const TextDirectionPathFinding: React.FC<TextDirectionPathProps> = ({
  start,
  end,
}) => {
  const [directions, setDirections] = useState<string[]>([]);

  useEffect(() => {
    const getDirections = async () => {
      try {
        const res = await axios.get("/api/map/getTextDirections", {
          params: { start, end },
        });
        console.log(res);
        setDirections(res.data);
      } catch (err) {
        console.error("Directions:", err);
      }
    };
    getDirections();
  }, [start, end]);

  return (
    <div
      className="scroll-container"
      style={{
        backgroundColor: "white",
        boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
        height: "75vh",
        overflow: "hidden",
        overflowY: "auto",
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

export default TextDirectionPathFinding;
