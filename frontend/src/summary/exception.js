import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from "victory";
import { Card, Container } from "@material-ui/core";
import { Avatar, makeStyles, useTheme, Chip, Button } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";

function getData(dayWiseSeverityCountWrapper) {
  const highArray = [];
  const mediumArray = [];
  const lowArray = [];
  const days = [];

  var maxCount = 0;
  for (let index = 0; index < dayWiseSeverityCountWrapper.length; index++) {
    const { day, dayWiseSeverityCount } = dayWiseSeverityCountWrapper[index];

    days.push(day);

    var low = 0;
    var medium = 0;
    var high = 0;

    dayWiseSeverityCount.forEach(({ count, severity }) => {
      if (count > maxCount) {
        // console.log("maxCountFound")
        maxCount = count;
      }

      switch (severity) {
        case 0:
          low = count;
          break;

        case 1:
          medium = count;
          break;

        case 2:
          high = count;
          break;

        default:
          break;
      }
    });

    lowArray.push({ y: low, x: index + 1, day });
    mediumArray.push({ y: medium, x: index + 1, day });
    highArray.push({ y: high, x: index + 1, day });
  }

  return { highArray, lowArray, mediumArray, days, maxCount };
}

function ExceptionStack({ dayWiseSeverityCountWrapper }) {
  const { highArray, lowArray, mediumArray, days, maxCount } = getData(dayWiseSeverityCountWrapper);


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
      <VictoryStack height={600} width={700} colorScale={["green", "yellow", "red"]}>
        <VictoryBar
          data={lowArray}
        />
        <VictoryBar
          data={mediumArray}
        />
        <VictoryBar
          data={highArray}
        />
        <VictoryAxis
          scale="time"
          standalone={false}
          // tickLabelComponent={<VictoryLabel dy={20} />}
          // domain={{ x: [1, 2, 3, 4, 5, 6, 7] }}
          tickValues={days}
          tickFormat={
            (x) => {
              const d = new Date(days[x - 1])
              return `${d.getDate()}/${d.getMonth() + 1}`
            }
          }
        />
        <VictoryAxis dependentAxis
          domain={[0, maxCount > 3 ? maxCount : 4]}
          offsetX={50}
          orientation="left"
          standalone={false}

        // style={styles.axisOne}
        />
        {/* <VictoryAxis dependentAxis crossAxis height={500} range={{ y: [0, maxCount+20] }} /> */}
        {/* <VictoryBar
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
        /> */}
        {/* <VictoryAxis /> */}
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
