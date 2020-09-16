import React from "react";
import { Paper, Button, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import classes from "./Landing.module.scss";

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(1),
  },
}));

const Landing = (props) => {
  const _classes = useStyles();
  const themeColor = props.themeColor;
  return (
    <Paper elevation={0} square className={classes.page}>
      <Typography variant="h2" className={_classes.btn}>
        V2C
      </Typography>
      <Button variant="contained" color="primary" className={_classes.btn}>
        PRIMARY
      </Button>
      <Button variant="contained" color="secondary" className={_classes.btn}>
        SECONDARY
      </Button>
      <IconButton
        className={_classes.btn}
        onClick={() => props.setThemeColor()}
      >
        {themeColor === "light" ? (
          <Brightness4 fontSize="large" />
        ) : (
          <Brightness7 fontSize="large" />
        )}
      </IconButton>
    </Paper>
  );
};

export default Landing;
