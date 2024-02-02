import "../styling/DataTable.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { DisplayNodeData } from "./DisplayNodeData.tsx";
import { NodeInfo } from "common/src/NodeInfo.tsx";
import { DisplayEdgeTable } from "./DisplayEdgeTable.tsx";

export function NodeDataTable() {
  const [nodes, setNodes] = useState<NodeInfo[]>([]);
  useEffect(() => {
    axios.get("/api/map").then((res) => {
      setNodes(Object.values(res.data));
    });
  }, []);

  return (
    <div>
      <div className={"DataTable"}>
        <h2>Current Node Data</h2>
        <DisplayNodeData nodes={nodes} />
      </div>
      <div className={"EdgeTable"}>
        <h2>Current Edge Data</h2>
        <DisplayEdgeTable nodes={nodes} />
      </div>
    </div>
  );
}
