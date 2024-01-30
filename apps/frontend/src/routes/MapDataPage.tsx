import { useEffect } from "react";
import { NodeDataTable } from "../components/NodeDataTable.tsx";
import { EdgeDataTable } from "../components/EdgeDataTable.tsx";

function MapDataPage() {
  useEffect(() => {
    document.title = "Map Data Page";
    console.log(`rendered component`);
  });

  return (
    <div className="mapdata">
      <NodeDataTable />
      <EdgeDataTable />
    </div>
  );
}

export default MapDataPage;
