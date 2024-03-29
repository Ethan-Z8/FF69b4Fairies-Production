import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
export function NodeDataTable() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [nodeData, setNodeData] = useState<MapNodeInterface[]>([]);
  const [nodeFilter, setNodeFilter] = useState<MapNodeInterface | null>(null);

  useEffect(() => {
    axios
      .get("/api/map")
      .then((res) => {
        setNodeData(Object.values(res.data));
        setLoaded(true);
      })
      .catch((e) => {
        console.log(e.message);
        setErr(true);
      });
  }, []);

  const headers = [
    "Node ID",
    "X Coord",
    "Y Coord",
    "Floor",
    "Building",
    "Node Type",
    "Short Name",
    "Long Name",
  ].map((val) => <TableCell key={val}>{val}</TableCell>);

  const body = nodeData
    .filter((req) => {
      if (nodeFilter) {
        return req.nodeID === nodeFilter.nodeID;
      }
      return true;
    })
    .map((node) => {
      return (
        <TableRow key={node.nodeID}>
          <TableCell>{node.nodeID}</TableCell>
          <TableCell>{node.xcoord}</TableCell>
          <TableCell>{node.ycoord}</TableCell>
          <TableCell>{node.floor}</TableCell>
          <TableCell>{node.building}</TableCell>
          <TableCell>{node.nodeType}</TableCell>
          <TableCell>{node.shortName}</TableCell>
          <TableCell>{node.longName}</TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <Typography variant="h4">Map Data</Typography>

      <FormControl sx={{ flex: 1 }}>
        <Autocomplete
          value={nodeFilter}
          onChange={(event, filteredVal) => {
            setNodeFilter(filteredVal);
          }}
          options={nodeData}
          getOptionLabel={(option) =>
            `${option.nodeID} - ${option.floor} - ${option.shortName}`
          }
          renderInput={(params) => (
            <TextField {...params} label={"Node Filter"} />
          )}
        />
      </FormControl>

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
      {err && <div className="text-danger mx-auto">Error loading map data</div>}
    </Box>
  );
}
