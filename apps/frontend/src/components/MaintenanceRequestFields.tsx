import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export function MaintenanceRequestFields() {
  return (
    <>
      <TextField label="Machine's Issue" name="issue" required multiline />
      <FormControl>
        <InputLabel>Type of Employee</InputLabel>
        <Select
          label="Specialist Required"
          labelId="specialist"
          defaultValue="Any"
          name="specialist"
          required
        >
          <MenuItem value="Any">Any</MenuItem>
          <MenuItem value="Janitor">Janitor</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Mechanic">Mechanic</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
