import React from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import StarRating from './StarRating';


const Result = () => (
  <Card className={"MuiNewsCard--01"}>
    <CardMedia
      className={"MuiCardMedia-root"}
      image={
        "https://thenewdaily.com.au/wp-content/uploads/2015/06/kraft-peanut-butter190615-newdaily.jpg"
      }
    >
      <Typography className={"MuiTypography--category"}></Typography>
    </CardMedia>
    <CardContent className={"MuiCardContent-root"}>
      <Typography
        className={"MuiTypography--overline"}
        variant={"overline"}
        gutterBottom
      >
        Kraft
      </Typography>
      <Typography
        className={"MuiTypography--heading"}
        variant={"h6"}
      >
        Peanut Butter - Crunchy
      </Typography>
      {/* <Typography className={"MuiTypography--subheading"} variant={"caption"}>
        caption etc
      </Typography> */}
    </CardContent>
    <CardActions className={"MuiCardActions-root"}>
      <StarRating />
      {/* <Button color={"primary"} fullWidth>
        View Full Info <Icon>chevron_right_rounded</Icon>
      </Button> */}
    </CardActions>
  </Card>
);

Result.getTheme = muiBaseTheme => ({
  MuiCard: {
    root: {
      "&.MuiNewsCard--01": {
        maxWidth: 304,
        margin: "auto",
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        boxShadow: "none",
        borderRadius: 0,
        "& button": {
          marginLeft: 0
        },
        "&:hover": {
          transform: "scale(1.04)",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)"
        },
        "& .MuiCardMedia-root": {
          paddingTop: "65%",
          position: "relative",
          "& .MuiTypography--category": {
            color: "rgba(255, 255, 255, 0.87)",
            position: "absolute",
            top: muiBaseTheme.spacing.unit * 2.5,
            left: muiBaseTheme.spacing.unit * 2.5,
            letterSpacing: 0.5,
            fontWeight: 900
          }
        },
        "& .MuiCardContent-root": {
          textAlign: "center",
          padding: muiBaseTheme.spacing.unit * 3,
          "& .MuiTypography--overline": {
            color: muiBaseTheme.palette.grey[500],
            fontWeight: "bold"
          },
          "& .MuiTypography--heading": {
            fontWeight: 900,
            lineHeight: 1.3
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8,
            color: muiBaseTheme.palette.text.primary,
            fontWeight: "bold"
          }
        },
        "& .MuiCardActions-root": {
          padding: `0 ${muiBaseTheme.spacing.unit * 3}px ${muiBaseTheme.spacing
            .unit * 3}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'column'
        }
      }
    }
  },
  MuiButton: {
    root: {
      "& svg, .material-icons": {
        marginLeft: muiBaseTheme.spacing.unit
      }
    },
    label: {
      textTransform: "initial"
    }
  }
});
Result.metadata = {
  name: "News Card",
  description: "Best for Blog"
};

export default Result;
