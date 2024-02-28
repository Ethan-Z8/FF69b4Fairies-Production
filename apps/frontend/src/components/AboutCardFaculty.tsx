import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

interface AboutInfo {
  Name: string;
  role: string;
  Imagepath: string;
}

const AboutCard = ({ Name, role, Imagepath }: AboutInfo) => {
  return (
    <Card
      sx={{
        maxWidth: 700,
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
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "140px",
        }}
      >
        <div>
          <CardContent sx={{ width: 250 }}>
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
