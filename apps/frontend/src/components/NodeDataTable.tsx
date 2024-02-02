import "../styling/DataTable.css";
import axios from "axios";
import { useEffect } from "react";
import { DisplayNodeData } from "./DisplayNodeData.tsx";
import { NodeInfo } from "common/src/NodeInfo.tsx";

async function getNodes() {
  try {
    const allNodes = await axios.get("/api/map");
    //this shit doesn't work because it's not expecting to find a NodeData type? or because NodeData doesn't have array properties written into it idk man
    const nodesData: NodeInfo[] = Object.values(allNodes.data);
    return nodesData;
  } catch (error) {
    console.error("Error fetching map nodes", error);
  }
}

export async function NodeDataTable() {
  useEffect(() => {
    getNodes();
  }, []);

  const nodesResponse = await getNodes();

  return (
    <div className={"DataTable"}>
      <h2>Current Node Data</h2>
      return(
      <DisplayNodeData nodes={nodesResponse!} />
    </div>
  );
}
