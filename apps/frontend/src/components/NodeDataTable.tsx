import "../styling/DataTable.css";
export function NodeDataTable() {
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
        </tr>
        <tr>
          <td>node1</td>
          <td>0</td>
          <td>0</td>
          <td>first floor</td>
          <td>hospital</td>
          <td>bad</td>
          <td>longername</td>
          <td>shortname</td>
        </tr>
        <tr>
          <td>node1</td>
          <td>0</td>
          <td>0</td>
          <td>first floor</td>
          <td>hospital</td>
          <td>bad</td>
          <td>longername</td>
          <td>shortname</td>
        </tr>
      </table>
    </div>
  );
}
