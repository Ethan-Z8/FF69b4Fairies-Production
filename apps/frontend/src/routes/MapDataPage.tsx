import React, { useEffect } from "react";
import { NodeDataTable } from "../components/NodeDataTable.tsx";
import "../styling/DataTable.css";
import { BackButton } from "../components/BackButton.tsx";

function MapDataPage() {
  useEffect(() => {
    document.title = "Map Data Page";
    console.log(`rendered component`);
  });

  return (
    <div className="mapdata">
      <NodeDataTable />
      <BackButton />
    </div>
  );
}

export default MapDataPage;
