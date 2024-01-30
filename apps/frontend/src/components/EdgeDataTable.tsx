import "../styling/DataTable.css";
export function EdgeDataTable() {
  return (
    <div className={"DataTable"}>
      <h2>Current Edge Data</h2>
      <table>
        <tr>
          <th>edgeID</th>
          <th>startNode</th>
          <th>endNode</th>
        </tr>
      </table>
    </div>
  );
}
