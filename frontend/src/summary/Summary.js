import React, { useState } from "react";
import SeverityPie from "./severity";
import StatusPie from "./status";
import ExceptionStack from "./exception";
import { Grid } from "@material-ui/core";

const Summary = () => {
  const [data, setData] = useState({
    totalExceptions: 15,
    totalResolvedExceptions: 10,
    totalUnresolvedExceptions: 5,
    totalHighSeverityExceptions: 5,
    totalMediumSeverityExceptions: 7,
    totalLowSeverityExceptions: 8,
    lastSevenDays: [
      {
        date: "",
        exceptionData: [2, 3, 5],
      },
      {
        date: "",
        exceptionData: [2, 3, 5],
      },
      {
        date: "",
        exceptionData: [2, 3, 5],
      },
      {
        date: "",
        exceptionData: [2, 3, 5],
      },
      {
        date: "",
        exceptionData: [2, 3, 5],
      },
      {
        date: "",
        exceptionData: [2, 3, 5],
      },
      {
        date: "",
        exceptionData: [2, 3, 5, 5, 5],
      },
    ],
  });

  return (
    <div>
      {/*<Grid container spacing={1}>
        <Grid item xs>
          <SeverityPie {...data} />
        </Grid>
        <Grid item xs>
          <StatusPie {...data} />
        </Grid>
      </Grid>
      <Grid>
        <ExceptionStack />
  </Grid>*/}
      <SeverityPie {...data} />
      <StatusPie {...data} />
      <ExceptionStack />
    </div>
  );
};

export default Summary;
