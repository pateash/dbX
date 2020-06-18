import React, { useState } from "react";
import SeverityPie from "./severity";
import StatusPie from "./status";
import ExceptionStack from "./exception";
import { Grid } from "@material-ui/core";
import {
  Error,
  Loading,
  useQuery,
} from "react-admin";

const Summary = () => {
  /* const [data, setData] = useState({
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
  }); */
  const { data, loading, error } = useQuery({
    type: 'getOne',
    resource: 'exception',
    payload: { id: 'summary' }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  console.log("data", data);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <SeverityPie {...data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatusPie {...data} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ExceptionStack {...data} />
      </Grid>

      {/* <SeverityPie {...data} />
      <StatusPie {...data} />
      <ExceptionStack /> */}
    </div>
  );
};

export default Summary;
