import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryBar, VictoryStack, VictoryAxis } from "victory";
import { Card, Container } from "@material-ui/core";
import { Avatar, makeStyles, useTheme, Chip, Button } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";

const graphicColor = ["red", "green"]; // Colors
//const wantedGraphicData = [{x: "Unresolved",  y: 10 }, {x: "Resolved", y: 50 }]; // Data that we want to display
const defaultGraphicData = [
  { x: "Unresolved", y: 0 },
  { x: "Resolved", y: 0 },
]; // Data used to make the animate prop work

function StatusPie({ totalResolvedExceptions, totalUnresolvedExceptions }) {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  /*useEffect(() => {
        async function fetchData() {
          const request = new Request(config.getStatusUrl, {
            method: "GET",
          });
          const response = await fetch(request);
          const res = await response.json();
          const Status = res;
          //{Status.map((status) => {
            //return const wantedGraphicData = [{x: "Unresolved", y: {status.unresolved}, {x: "Resolved", y: {status.resolved}} ];
          //})}
            const wantedGraphicData = [{x: "Unresolved", y: {Status.unresolved}, {x: "Resolved", y: {Status.resolved}} ];
          setGraphicData(wantedGraphicData);
          setLoading(false);
        }
        fetchData();
      }, []);*/

  // Setting the data that we want to display

  useEffect(() => {
    setGraphicData([
      { x: "Unresolved", y: totalResolvedExceptions },
      { x: "Resolved", y: totalUnresolvedExceptions },
    ]); // Setting the data that we want to display
  }, []);

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
        colorScale={graphicColor}
        //startAngle={90}
        //endAngle={450}
        //radius={({ datum }) => 1 + datum.y}
        padAngle={({ datum }) => datum.y}
        innerRadius={10}
        labelRadius={({ innerRadius }) => innerRadius + 20}
        //labels={({ datum }) => `${datum.x} : ${datum.y}`}
        labels={({ datum }) => datum.y}
        style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
      />
      <h3 xs={12} sm={3}>
        Status:{" "}
      </h3>
      <Chip
        item
        xs={12}
        sm={3}
        variant="outlined"
        avatar={<Avatar className={classes.green}> </Avatar>}
        label={"RESOLVED"}
      />
      <Chip
        xs={12}
        sm={3}
        variant="outlined"
        avatar={<Avatar className={classes.red}> </Avatar>}
        label={"UNRESOLVED"}
      />
    </Container>
  );
}

export default StatusPie;
