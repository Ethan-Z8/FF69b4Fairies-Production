import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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
}: AboutInfo) => {
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardMedia sx={{ height: 200 }} image={Imagepath} title={Name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" href={Github}>
          Github
        </Button>
        <Button size="small" href={Linkdin}>
          {" "}
          Linkdin{" "}
        </Button>
      </CardActions>
    </Card>
  );
};
export default AboutCard;
