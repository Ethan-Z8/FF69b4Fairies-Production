import { PathOrFileDescriptor, readFileSync } from "fs";
import { Employee } from "common/src/interfaces/Employee.ts";

export default class EmployeeData implements Employee {
  username: string;
  password: string;
  displayName: string;

  private constructor(properties: Array<string>) {
    [this.username, this.password, this.displayName] = properties;
  }

  static readCsv(filename: PathOrFileDescriptor): EmployeeData[] {
    const input = readFileSync(filename, "utf8");
    return EmployeeData.csvStringToEmp(input);
  }

  static csvStringToEmp(input: string): EmployeeData[] {
    // Split by lines. The first line is the headers, the last line is a blank
    const lines = input.split(/\r?\n/);
    const top = lines.shift();
    if (top !== "username,password,displayName") {
      throw new Error(
        `This csv does not have the right headers they should be: ${top}`,
      );
    }
    return lines
      .filter((line) => line !== "")
      .map((line) => {
        const props = line.split(",");
        return {
          username: props[0],
          password: props[1],
          displayName: props[2],
        };
      });
  }
}
