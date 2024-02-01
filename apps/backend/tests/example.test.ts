import { expect, test } from "vitest";
import fs from "fs";

function sum(a: number, b: number): number {
  return a + b;
}

interface CSVRow {
  [key: string]: string;
}

function parseCSVFile(
  filePath: string,
  callback: (err: Error | null, data: CSVRow[]) => void,
) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, []);
      return;
    }

    const rows: string[] = data.split("\n");
    const headers: string[] = rows[0].split(",");
    const result: CSVRow[] = [];

    for (let i = 1; i < rows.length; i++) {
      const row: string[] = rows[i].split(",");
      if (row.length === headers.length) {
        const obj: CSVRow = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j];
        }
        result.push(obj);
      }
    }

    callback(null, result);
  });
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("testing parsing the data", () => {
  parseCSVFile(
    "../backend/csvFiles/L1Nodes.csv",
    (error: Error | null, data: CSVRow[]) => {
      data;
    },
  );
});
