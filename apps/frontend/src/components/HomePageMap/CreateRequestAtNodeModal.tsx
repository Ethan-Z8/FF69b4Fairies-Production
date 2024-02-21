import { Dialog, DialogContent, IconButton } from "@mui/material";
import { CreateServiceRequestPage } from "../../routes/CreateServiceRequestPage.tsx";
import CloseIcon from "@mui/icons-material/Close";

export interface CreateRequestAtNodeModalProps {
  nodeID: string;
  open: boolean;
  setOpen: (state: boolean) => void;
}
export function CreateRequestAtNodeModal({
  nodeID,
  open,
  setOpen,
}: CreateRequestAtNodeModalProps) {
  console.log(open);
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent sx={{ overflowX: "hidden" }}>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <CreateServiceRequestPage node={nodeID} />
      </DialogContent>
    </Dialog>
  );
}
