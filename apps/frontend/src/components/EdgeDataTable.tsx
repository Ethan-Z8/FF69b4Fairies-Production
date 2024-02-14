import { MapEdgeInterface } from "common/src/interfaces/MapEdgeInterface.ts";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
export function EdgeDataTable() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [edgeData, setEdgeData] = useState<MapEdgeInterface[]>([]);

  useEffect(() => {
    axios
      .get("/api/map/edges")
      .then((res) => {
        setEdgeData(Object.values(res.data));
        setLoaded(true);
      })
      .catch((e) => {
        console.log(e.message);
        setErr(true);
      });
  }, []);

  const headers = ["Edge ID", "Start Node", "End Node"].map((val) => (
    <TableCell key={val}>{val}</TableCell>
  ));

  const body = edgeData.map((edge) => {
    return (
      <TableRow key={edge.edgeID}>
        <TableCell>{edge.edgeID}</TableCell>
        <TableCell>{edge.startNode}</TableCell>
        <TableCell>{edge.endNode}</TableCell>
      </TableRow>
    );
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <Typography variant="h4">Edge Data</Typography>
      {loaded && (
        <TableContainer
          sx={{ border: 1, borderColor: "#44444444", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>{headers}</TableRow>
            </TableHead>
            <TableBody>{body}</TableBody>
          </Table>
        </TableContainer>
      )}
      {err && (
        <div className="text-danger mx-auto">Error loading edge data</div>
      )}
    </Box>
  );
}
