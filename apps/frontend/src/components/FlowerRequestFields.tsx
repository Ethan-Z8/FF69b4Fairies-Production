import { MenuItem, TextField, Typography } from "@mui/material";

const flowerOptions = [
  {
    label: "All Occasion Classic - $65.00 – $90.00",
    value: "All Occasion Classic",
  },
  { label: "Classic Dozen Roses - $90.00", value: "Classic Dozen Roses" },
  { label: "Colorful Elegance - $84.00 – $103.00", value: "Colorful Elegance" },
  { label: "Dish Garden - $65.00", value: "Dish Garden" },
  { label: "Go-To-Two! - $70.00", value: "Go-To-Two!" },
  { label: "Holland Spring - $55.00 – $74.00", value: "Holland Spring" },
  { label: "Large Orchid Plant - $90.00", value: "Large Orchid Plant" },
  { label: "Orchid Festival - $70.00 – $88.00", value: "Orchid Festival" },
  { label: "Our Go-To Arrangement - $70.00", value: "Our Go-To Arrangement" },
  { label: "Small and Sweet - $65.00", value: "Small and Sweet" },
  { label: "Small and Sweet II - $65.00", value: "Small and Sweet II" },
  {
    label: "Summer Sunshine Sunflowers - $64.00 – $85.00",
    value: "Summer Sunshine Sunflowers",
  },
  { label: "Welcome Baby Boy - $65.00 – $90.00", value: "Welcome Baby Boy" },
  { label: "Welcome Baby Girl - $65.00 – $90.00", value: "Welcome Baby Girl" },
];

export function FlowerRequestFields() {
  return (
    <>
      <Typography variant="h5">Flower Request</Typography>
      <Typography variant="h6" style={{ fontSize: "16px", color: "gray" }}>
        Created by: Max Friedman
      </Typography>
      <TextField name="recipient" label="Recipient" required />
      <TextField select name="flowerType" label="Flower Type" required>
        {flowerOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
