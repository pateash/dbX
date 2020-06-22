import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";
import { Container } from "@material-ui/core";
import { Avatar, makeStyles, useTheme, Chip, Button } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";
import ExceptionTable from "../exceptionTable/ExceptionTable";

const graphicColor = ["red", "#FDF200", "green"]; // Colors
//const wantedGraphicData = [{x: "High", y: 70 }, {x: "Medium", y: 50 }, {x: "Low", y: 40 }]; // Data that we want to display
const defaultGraphicData = [
  { x: "High", y: 120 },
  { x: "Medium", y: 120 },
  { x: "Low", y: 120 },
]; // Data used to make the animate prop work

function SeverityPie({
  totalHighSeverityExceptions,
  totalMediumSeverityExceptions,
  totalLowSeverityExceptions,
}) {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  //let HighSeverity={props.data.totalHighSeverityExceptions}
  //const wantedGraphicData= [{x: "High", y: <div>${data.totalHighSeverityExceptions}</div> }, {x: "Medium", y: 50 }, {x: "Low", y: 40 }];
  /*const [high, setHigh] = useState(0);
  useEffect(() => {
     setHigh=${data.totalResolvedExceptions};
  },[]);*/
  console.log(
    totalHighSeverityExceptions,
    totalMediumSeverityExceptions,
    totalLowSeverityExceptions
  );
  useEffect(() => {
    setGraphicData([
      { x: "High", y: totalHighSeverityExceptions },
      { x: "Medium", y: totalMediumSeverityExceptions },
      { x: "Low", y: totalLowSeverityExceptions },
    ]); // Setting the data that we want to display
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  };

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
    yellow: {
      color: theme.palette.getContrastText(yellow[500]),
      backgroundColor: "#FDF200",
    },
    green: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: "green",
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
      <VictoryPie
        animate={{ duration: 1000 }}
        data={graphicData}
        width={250}
        height={250}
        //startAngle={45}
        //endAngle={405}
        colorScale={graphicColor}
        //radius={({ datum }) => 2 + datum.y * 2}
        //labels={({ datum }) => `${datum.x} : ${datum.y}`}
        padAngle={({ datum }) => datum.y}
        innerRadius={10}
        labelRadius={({ innerRadius }) => innerRadius + 20}
        //labels={({ datum }) => `${datum.x} : ${datum.y}`}
        labels={({ datum }) => datum.y}
        style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
      />
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
        avatar={<Avatar className={classes.yellow}> </Avatar>}
        label={"MEDIUM"}
      />
      <Chip
        xs={12}
        sm={3}
        variant="outlined"
        avatar={<Avatar className={classes.green}> </Avatar>}
        label={"LOW"}
      />
    </Container>
  );
}
export default SeverityPie;
