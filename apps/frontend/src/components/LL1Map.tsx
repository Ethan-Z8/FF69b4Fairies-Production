import React from "react";

import "../styling/map.css";

const LL1Map = ({ mapPath }: { mapPath: string }) => {
  return <img className="LL1-Map" alt="Element" src={mapPath} />;
};

export default LL1Map;
