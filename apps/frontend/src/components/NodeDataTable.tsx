import "../styling/DataTable.css";
import axios from "axios";
import { useEffect } from "react";

async function getNodes() {
  try {
    const allNodes = await axios.get("/api/map");
    const nodesData: Node[] = Object.values(allNodes.data);
    console.log(nodesData);
  } catch (error) {
    console.error("Error fetching map nodes", error);
  }
}

export function NodeDataTable() {
  useEffect(() => {
    getNodes();
  }, []);

  return (
    <div className={"DataTable"}>
      <h2>Current Node Data</h2>
      <table>
        <tr>
          <th>nodeID</th>
          <th>xcoord</th>
          <th>ycoord</th>
          <th>floor</th>
          <th>building</th>
          <th>nodeType</th>
          <th>longName</th>
          <th>shortName</th>
          <th>neighbors</th>
        </tr>

        <tr></tr>
      </table>
    </div>
  );
}
