import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryBar, VictoryStack, VictoryAxis } from "victory";
import { Card, Container } from "@material-ui/core";
import { Avatar, makeStyles, useTheme, Chip, Button } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";

function ExceptionStack() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    red: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: "red",
    },
    green: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: "green",
    },

    yellow: {
      color: theme.palette.getContrastText(yellow[500]),
      backgroundColor: "#FDF200",
    },

    containerStyle: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.containerStyle}>
      <VictoryStack colorScale={["green", "yellow", "red"]}>
        {/*<VictoryAxis/>*/}
        <VictoryBar
          data={[
            { x: "1", y: 2 },
            { x: "2", y: 3 },
            { x: "3", y: 5 },
            { x: "4", y: 2 },
            { x: "5", y: 3 },
            { x: "6", y: 5 },
            { x: "7", y: 2 },
          ]}
        />
        <VictoryBar
          data={[
            { x: "1", y: 1 },
            { x: "2", y: 4 },
            { x: "3", y: 5 },
            { x: "4", y: 1 },
            { x: "5", y: 4 },
            { x: "6", y: 5 },
            { x: "7", y: 4 },
          ]}
        />
        <VictoryBar
          data={[
            { x: "1", y: 3 },
            { x: "2", y: 2 },
            { x: "3", y: 6 },
            { x: "4", y: 3 },
            { x: "5", y: 2 },
            { x: "6", y: 6 },
            { x: "7", y: 2 },
          ]}
        />
        <VictoryAxis />
      </VictoryStack>
      <h3 xs={12} sm={3}>
        Severity:{" "}
      </h3>
      <Chip
        item
        xs={12}
        sm={3}
        variant="outlined"
        avatar={<Avatar className={classes.red}> </Avatar>}
        label={"HIGH"}
      />
      <Chip
        xs={12}
        sm={3}
        variant="outlined"
        avatar={<Avatar className={classes.green}> </Avatar>}
        label={"LOW"}
      />
      <Chip
        xs={12}
        sm={3}
        variant="outlined"
        avatar={<Avatar className={classes.yellow}> </Avatar>}
        label={"MEDIUM"}
      />
    </Container>
  );
}

export default ExceptionStack;
