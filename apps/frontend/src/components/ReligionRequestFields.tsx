import { TextField, Typography } from "@mui/material";

export function ReligionRequestFields() {
  return (
    <>
      <Typography variant="h5">Religious Request</Typography>
      <TextField label="Religion" name="religionType" required />
      <TextField label="Type Of Service" name="typeOfService" required />
    </>
  );
}
