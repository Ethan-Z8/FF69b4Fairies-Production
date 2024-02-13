import { TextField, Typography } from "@mui/material";

export function FlowerRequestFields() {
  return (
    <>
      <Typography variant="h5">Flower Request</Typography>
      <TextField name="recipient" label="Recipient" required />
      <TextField name="flowerType" label="Flower Type" required />
    </>
  );
}
