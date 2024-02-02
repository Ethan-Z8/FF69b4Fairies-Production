import "../styling/DataTable.css";
import { NodeInfo } from "common/src/NodeInfo.tsx";
export function DisplayEdgeTable(props: { nodes: NodeInfo[] }) {
  return (
    <div className={"DataTable"}>
      <table>
        <tr>
          <th>startNode</th>
          <th>endNode</th>
        </tr>
        {props.nodes.map((i: NodeInfo) => {
          return i.neighbors.map((j: string) => {
            return (
              <tr>
                <td>{i.nodeID}</td>
                <td>{j}</td>
              </tr>
            );
          });
        })}
      </table>
    </div>
  );
}

//iterate through all the nodes
//create a row for every neighbor the node has
//potentially clear repeats but I won't
