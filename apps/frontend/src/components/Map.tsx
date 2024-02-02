import React from "react";

import "../styling/map.css";

const Map = ({ mapPath }: { mapPath: string }) => {
  return <img className="LL1-Map" alt="Element" src={mapPath} />;
};

export default Map;
