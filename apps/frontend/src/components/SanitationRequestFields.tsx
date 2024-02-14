import {
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

export function SanitationRequestFields() {
  return (
    <>
      <Typography variant="h5">Sanitation Request</Typography>
      <TextField
        label="Description of Mess"
        name="messDesc"
        required
        multiline
      />
      <FormControlLabel
        label="Hazardous"
        control={<Checkbox id="hazardous" name="hazardous" value="hazardous" />}
        sx={{ alignSelf: "flex-start" }}
      />
    </>
  );
}
