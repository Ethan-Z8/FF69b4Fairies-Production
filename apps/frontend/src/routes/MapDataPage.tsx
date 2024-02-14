import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { NodeDataTable } from "../components/NodeDataTable.tsx";
import { EdgeDataTable } from "../components/EdgeDataTable.tsx";

export function MapDataPage() {
  const [tab, setTab] = useState("node");

  return (
    <Box sx={{ mt: 2, mr: "auto", ml: 10 }}>
      <Tabs
        value={tab}
        onChange={(e, newVal) => setTab(newVal)}
        aria-label="lab API tabs example"
      >
        <Tab label="Node Data" value="node" />
        <Tab label="Edge Data" value="edge" />
      </Tabs>
      {tab === "node" && <NodeDataTable />}
      {tab === "edge" && <EdgeDataTable />}
    </Box>
  );
}
