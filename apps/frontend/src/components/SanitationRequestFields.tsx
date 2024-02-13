import { TextField, FormControlLabel, Checkbox } from "@mui/material";

export function SanitationRequestFields() {
  return (
    <>
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
