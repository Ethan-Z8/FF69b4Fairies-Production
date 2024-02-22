import { Autocomplete, TextField } from "@mui/material";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";

type LocationSearchProps = { nodes: MapNodeInterface[] };

function LocationSearch({ nodes }: LocationSearchProps) {
  return (
    <Autocomplete
      options={nodes}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pill Autocomplete"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px", // Adjust border radius to make it pill-like
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "50px", // Ensure the outline also has the pill shape
            },
          }}
        />
      )}
    />
  );
}

export default LocationSearch;
