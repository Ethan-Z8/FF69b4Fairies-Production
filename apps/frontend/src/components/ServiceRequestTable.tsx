import React, { useState, ChangeEvent } from "react";

import "../styling/ServiceRequestLog.css";

//import { BackButtonForAdmin } from "../components/BackButtonForAdmin.tsx";

interface ModularServiceTable {
  columns: string[];
}

interface RowData {
  [key: string]: string;
}

const ServiceTable: React.FC<ModularServiceTable> = ({ columns }) => {
  const [tableData, setTableData] = useState<RowData[]>([]);
  const [newRow, setNewRow] = useState<RowData>(
    columns.reduce((acc, column) => ({ ...acc, [column]: "" }), {}),
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    columnName: string,
  ) => {
    setNewRow((prevRow) => ({ ...prevRow, [columnName]: e.target.value }));
  };

  const handleAddRow = () => {
    setTableData((prevData) => [...prevData, newRow]);
    setNewRow(columns.reduce((acc, column) => ({ ...acc, [column]: "" }), {}));
  };

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
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={"add-row-section"}>
        <h2>Add New Row</h2>
        <form>
          {columns.map((column, index) => (
            <div key={index}>
              <label>{column}</label>
              <input
                type="text"
                value={newRow[column]}
                onChange={(e) => handleInputChange(e, column)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddRow}>
            Add Row
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceTable;
