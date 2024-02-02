import { NodeInfo } from "common/src/NodeInfo.tsx";

export function DisplayNodeData(props: { nodes: NodeInfo[] }) {
  return (
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
      {props.nodes.map((i: NodeInfo) => {
        return (
          <tr>
            <td>{i.nodeID}</td>
            <td>${i.xcoord}</td>
            <td>${i.ycoord}</td>
            <td>{i.floor}</td>
            <td>{i.building}</td>
            <td>{i.nodeType}</td>
            <td>{i.longName}</td>
            <td>{i.shortName}</td>
            <td>${i.nodesNextTo}</td>
          </tr>
        );
      })}
    </table>
  );
}
