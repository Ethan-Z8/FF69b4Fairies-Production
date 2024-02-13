import { TextField, Select, MenuItem } from "@mui/material";

export function MaintenanceRequestFields() {
  return (
    <>
      <TextField label="Machine's Issue" name="issue" required multiline />

      <Select
        label="Specialist Required"
        labelId="machineLocation"
        defaultValue="Any"
        name="machineLocation"
        required
      >
        <MenuItem value="Any">Any</MenuItem>
        <MenuItem value="Janitor">Janitor</MenuItem>
        <MenuItem value="Electric">Electric</MenuItem>
        <MenuItem value="Mechanic">Mechanic</MenuItem>
      </Select>
    </>
  );
}
