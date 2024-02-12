import axios from "axios";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";

export function MapDataPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [nodeData, setNodeData] = useState<MapNodeInterface[]>([]);

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
    "nodeID",
    "xcoord",
    "ycoord",
    "floor",
    "building",
    "nodeType",
    "shortName",
    "longName",
  ].map((val) => <th key={val}>{val}</th>);

  const body = nodeData.map((node) => {
    return (
      <tr key={node.nodeID}>
        <td>{node.nodeID}</td>
        <td>{node.xcoord}</td>
        <td>{node.ycoord}</td>
        <td>{node.floor}</td>
        <td>{node.building}</td>
        <td>{node.nodeType}</td>
        <td>{node.shortName}</td>
        <td>{node.longName}</td>
      </tr>
    );
  });

  return (
    <Stack gap={3} className="overflow-auto flex-grow-1">
      {loaded && (
        <Table className="mx-auto w-75 table-striped" bordered size="sm">
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{body}</tbody>
        </Table>
      )}

      {err && <div className="text-danger mx-auto">Error loading map data</div>}
    </Stack>
  );
}
