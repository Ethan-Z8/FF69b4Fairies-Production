import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
interface AboutInfo {
  Name: string;
  role: string;
  devrole: string;
  ClassYear: string;
  Major: string;
  Email: string;
  Github: string;
  Linkdin: string;
  Imagepath: string;
  Favorite_quote: string;
}
const AboutCard = ({
  Name,
  role,
  devrole,
  ClassYear,
  Major,
  Email,
  Github,
  Linkdin,
  Imagepath,
  Favorite_quote,
}: AboutInfo) => {
  return (
    <Card
      sx={{ maxWidth: 700 }}
      style={{
        paddingTop: "10px",
        paddingRight: "10px",
        paddingLeft: "10px",
        maxWidth: "18%",
      }}
    >
      <CardMedia sx={{ height: 250 }} image={Imagepath} title={Name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" maxWidth={"50%"}>
          {Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Software Role: {devrole}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Class Year: {ClassYear}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Major: {Major}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {Email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Favorite quote: {Favorite_quote}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton href={Github} target="_blank">
          <GitHubIcon sx={{ fontSize: "larger" }} />
        </IconButton>
        <IconButton href={Linkdin} target="_blank">
          <LinkedInIcon sx={{ fontSize: "larger" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default AboutCard;
