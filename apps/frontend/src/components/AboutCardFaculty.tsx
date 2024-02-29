import {
  Box,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
  ClassYear?: string;
  Major?: string;
  Email: string;
  Github?: string;
  Linkdin?: string;
  Imagepath: string;
}

const AboutCardFaculty = ({
  Name,
  role,
  ClassYear,
  Major,
  Email,
  Imagepath,
  Github,
  Linkdin,
}: AboutInfo) => {
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
          height: "300px",
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
            {ClassYear && (
              <Typography variant="body2" color="text.secondary">
                Class Year: {ClassYear}
              </Typography>
            )}
            {Major && (
              <Typography variant="body2" color="text.secondary">
                Major: {Major}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Email: {Email}
            </Typography>
          </CardContent>
        </div>
        <div>
          <CardActions sx={{ alignItems: "end" }}>
            {Github && (
              <IconButton href={Github} target="_blank">
                <GitHubIcon sx={{ fontSize: "larger" }} />
              </IconButton>
            )}
            {Linkdin && (
              <IconButton href={Linkdin} target="_blank">
                <LinkedInIcon sx={{ fontSize: "larger" }} />
              </IconButton>
            )}
          </CardActions>
        </div>
      </div>
    </Card>
  );
};

export default AboutCardFaculty;
