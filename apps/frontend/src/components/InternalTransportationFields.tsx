import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { useEffect } from "react";
type InternalTransportationFieldsProps = {
  nodes: MapNodeInterface[];
};
export function InternalTransportationFields(
  props: InternalTransportationFieldsProps,
) {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <>
      <Typography variant="h5">Internal Transportation Request</Typography>
      <FormControl>
        <InputLabel id="endloc">End Location</InputLabel>
        <Select
          label="End Location"
          labelId="endloc"
          name="endLocation"
          required
        >
          {props.nodes.map((node) => {
            return (
              <MenuItem key={node.nodeID} value={node.nodeID}>
                {node.longName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField label="Equipment Needed" name="equipmentNeeded" required />
    </>
  );
}
