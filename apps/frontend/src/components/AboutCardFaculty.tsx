import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000 !important",
  boxShadow: 24,
  p: 4,
};

interface AboutInfo {
  Name: string;
  role: string;
  Imagepath: string;
}

const AboutCard = ({ Name, role, Imagepath }: AboutInfo) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        maxWidth: 700,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#e9e8e9",
          // backgroundColor:"green",
        },
      }}
      style={{
        paddingTop: "10px",
        paddingRight: "10px",
        paddingLeft: "10px",
        maxWidth: "19%",
      }}
    >
      <CardMedia
        sx={{ height: 250, width: 250 }}
        image={Imagepath}
        title={Name}
        onClick={handleOpen}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Name: {Name}
          </Typography>
        </Box>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "140px",
        }}
      >
        <div>
          <CardContent onClick={handleOpen} sx={{ width: 250 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              maxWidth={"50%"}
            >
              {Name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {role}
            </Typography>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
export default AboutCard;
