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
      <CardMedia sx={{ height: 200 }} image={Imagepath} title={Name} />
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
