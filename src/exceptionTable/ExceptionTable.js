import React, { useState, useEffect } from "react";
import {
  List,
  TextField,
  DateField,
  Datagrid,
  RichTextField,
  FunctionField,
  ChipField,
  EditButton,
  ShowButton,
  useRefresh,
} from "react-admin";
import { Avatar, makeStyles, useTheme, Chip, Button } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";
import ExceptionFilter from "./ExceptionFilter";

//import rowStyle from "./rowStyle";

const useListStyles = makeStyles({
  headerRow: {
    borderLeftColor: "white",
    borderLeftWidth: 5,
    borderLeftStyle: "solid",
  },
  headerCell: {
    padding: "6px 8px 6px 8px",
  },
  rowCell: {
    padding: "6px 8px 6px 8px",
  },
  comment: {
    maxWidth: "18em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  redCircle: {
    color: red[500],
    backgroundColor: red[500],
    // width: theme.spacing(3),
    // height: theme.spacing(3),
  },
  greenCircle: {
    color: green[500],
    backgroundColor: green[500],
    // width: theme.spacing(3),
    // height: theme.spacing(3),
  },
  yellowCircle: {
    color: yellow[500],
    backgroundColor: yellow[500],
    // width: theme.spacing(3),
    // height: theme.spacing(3),
  },
});

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}


const ExceptionTable = ({ selectedRow, ...props }) => {
  const [refresh, setRefresh] = useLocalStorage('autoRefresh', false);
  // const [refresh, setRefresh] = useState(true);
  const classes = useListStyles();
  const doRefresh = useRefresh();

  useEffect(() => {
    /* refreshData(1)
    return cancelTimer; */
    const timer = setInterval(() => {
      if (refresh) {
        console.log('Refresh Data');
        doRefresh();
      }
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [refresh]);

  return (
    <div>
      <Button onClick={() => {
        /* if (!refresh) {
          refreshData(1);
        } else {
          cancelTimer();
        } */
        setRefresh(!refresh);
      }} color="primary" variant="outlined">{refresh ? "STOP" : "START"} AUTO REFRESH</Button>
      <List
        {...props}
        filters={<ExceptionFilter />}
      >
        <Datagrid
          rowClick="show"
          classes={{
            headerRow: classes.headerRow,
            headerCell: classes.headerCell,
            rowCell: classes.rowCell,
          }}
          optimized
          {...props}
        >
          <DateField label="Time Generated" source="timeGenerated" showTime />
          <TextField source="source" />
          <TextField source="category" />
          <TextField source="description" />
          <FunctionField label="Severity" source="severity" sortBy="severity" render={record => {
            var avatarClass;
            var chipColor;
            const severity = record.severity.toLowerCase();
            switch (severity) {
              case "severity_high":
                avatarClass = classes.redCircle;
                chipColor = red[500];
                break;
              case "severity_medium":
                avatarClass = classes.yellowCircle;
                chipColor = yellow[500];
                break;
              case "severity_low":
                avatarClass = classes.greenCircle;
                chipColor = green[500];
                break;
            }

            return <>
              <Chip
                variant="outlined"
                avatar={<Avatar className={avatarClass} variant="circle"> </Avatar>}
                label={severity.split("_")[1].toUpperCase()}
                style={{
                  color: chipColor,
                }}
              />
            </>
          }} />
          <TextField label="Business Component" source="businessComponent.name" />
          {/*<TextField label="Org. Unit" source="orgUnit.name" />*/}
          {/*<RichTextField label="Technical Description" source="technicalDescription" />*/}
          <FunctionField label="Status" source="status" sortBy="status" render={record => {
            var avatarClass;
            var chipColor;
            const status = record.status.toLowerCase();
            switch (status) {
              case "status_unresolved":
                avatarClass = classes.redCircle;
                chipColor = red[500];
                break;
              case "status_resolved":
                avatarClass = classes.greenCircle;
                chipColor = green[500];
                break;
            }

            return <>
              <Chip
                variant="outlined"
                avatar={<Avatar className={avatarClass} variant="circle"> </Avatar>}
                label={status.split("_")[1].toUpperCase()}
                style={{
                  color: chipColor,
                }}
              />
            </>
          }} />
          {/*<DateField showTime label="Updated Time" source="updateTime" />*/}
          {/*<TextField source="comment" />*/}
          <EditButton />
        </Datagrid>
      </List>
    </div>
  );
};
export default ExceptionTable;
