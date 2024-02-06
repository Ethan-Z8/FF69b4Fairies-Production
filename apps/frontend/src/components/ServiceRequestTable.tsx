import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModularServiceTable {
  columns: string[];
}

interface RowData {
  date: string;
  typeService: string;
  reason: string;
  nodeLoc: string;
  employeeName: string;
  progress: string;
}

const ServiceTable: React.FC<ModularServiceTable> = ({ columns }) => {
  const [tableData, setTableData] = useState<RowData[]>([]);
  // Remove 'displayData' state as it is not necessary
  useEffect(() => {
    axios.get("/api/serviceRequest").then((result) => {
      console.log(result.data);
      setTableData(result.data);
    });
  }, [columns]); // Only 'columns' is a dependency

  return (
    <div className={"service-request-table-container"}>
      <table className={"service-request-table"}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.date}</td>
              <td>{row.typeService}</td>
              <td>{row.reason}</td>
              <td>{row.nodeLoc}</td>
              <td>{row.employeeName}</td>
              <td>{row.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
