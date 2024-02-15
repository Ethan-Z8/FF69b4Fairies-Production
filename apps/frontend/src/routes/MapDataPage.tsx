import { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { NodeDataTable } from "../components/NodeDataTable.tsx";
import { EdgeDataTable } from "../components/EdgeDataTable.tsx";

export function MapDataPage() {
  const [tab, setTab] = useState("node");

  return (
    <Paper
      elevation={24}
      sx={{
        my: 8,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "90%",
        border: "8px solid #012D5A", // Add border styling here
        borderRadius: "8px", // Add border-radius for rounded corners
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <Box sx={{ mt: 2, mr: "auto", ml: 10 }}>
        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)}>
          <Tab label="Node Data" value="node" />
          <Tab label="Edge Data" value="edge" />
        </Tabs>
        {tab === "node" && <NodeDataTable />}
        {tab === "edge" && <EdgeDataTable />}
      </Box>
    </Paper>
  );
}
