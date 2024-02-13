import { TextField } from "@mui/material";

export function ReligionRequestFields() {
  return (
    <>
      <TextField label="Religion" name="religion" required />
      <TextField label="Type Of Service" name="typeOfService" required />
    </>
  );
}
