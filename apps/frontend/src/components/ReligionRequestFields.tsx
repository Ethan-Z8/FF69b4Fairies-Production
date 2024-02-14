import { TextField, Typography } from "@mui/material";

export function ReligionRequestFields() {
  return (
    <>
      <Typography variant="h5">Religious Request</Typography>
      <Typography variant="h6" style={{ fontSize: "16px", color: "gray" }}>
        Created by: Shawn Patel
      </Typography>
      <TextField label="Religion" name="religionType" required />
      <TextField label="Type Of Service" name="typeOfService" required />
    </>
  );
}
