import React, { useEffect } from "react";
//import { NodeDataTable } from "../components/NodeDataTable.tsx";
import { EdgeDataTable } from "../components/EdgeDataTable.tsx";

function MapDataPage() {
  useEffect(() => {
    document.title = "Map Data Page";
    console.log(`rendered component`);
  });

  //TODO: fix this (why does is it upset about what NodeDataTable returns? is this something to do with backend stuff
  //        <NodeDataTable/>
  return (
    <div className="mapdata">
      <EdgeDataTable />
    </div>
  );
}

export default MapDataPage;
