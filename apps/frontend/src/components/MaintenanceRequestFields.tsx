import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export function MaintenanceRequestFields() {
  return (
    <>
      <Typography variant="h5">Maintenance Request</Typography>
      <Typography variant="h6" style={{ fontSize: "16px", color: "gray" }}>
        Created by: Justin Smith
      </Typography>
      <TextField label="Machine's Issue" name="issueType" required multiline />
      <FormControl>
        <InputLabel>Type of Employee</InputLabel>
        <Select
          label="Specialist Required"
          labelId="personnelNeeded"
          defaultValue="Any"
          name="personnelNeeded"
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
