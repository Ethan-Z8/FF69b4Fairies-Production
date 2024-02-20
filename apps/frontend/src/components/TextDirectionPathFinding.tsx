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
    <>
      <h1>Text Directions</h1>
      <ul>
        {directions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ul>
    </>
  );
};

export default TextDirectionPathFinding;
