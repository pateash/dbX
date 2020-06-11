import * as React from "react";
import { Filter, SearchInput } from "react-admin";
import { Avatar, makeStyles, useTheme, Chip } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";

const useQuickFilterStyles = makeStyles({
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

const QuickFilter = ({ defaultValue }) => {
  const classes = useQuickFilterStyles();
  switch (defaultValue) {
    case "high":
      avatarClass = classes.redCircle;
      chipColor = red[500];
      break;
    case "medium":
      avatarClass = classes.yellowCircle;
      chipColor = yellow[500];
      break;
    case "low":
      avatarClass = classes.greenCircle;
      chipColor = green[500];
      break;
    case "unresolved":
      avatarClass = classes.redCircle;
      chipColor = red[500];
      break;
    case "resolved":
      avatarClass = classes.greenCircle;
      chipColor = green[500];
      break;
  }
  return (
    <Chip
      variant="outlined"
      avatar={
        <Avatar className={avatarClass} variant="circle">
          {" "}
        </Avatar>
      }
      label={defaultValue.toUpperCase()}
      style={{
        color: chipColor,
      }}
    />
  );
};

const ExceptionFilter = (props) => {
  return (
    <Filter {...props}>
      <SearchInput source="q" alwaysOn />
      <QuickFilter
        source="status"
        label="Unresolved exception"
        defaultValue={"unresolved"}
      />
      <QuickFilter source="status" label="Resolved exception" defaultValue={"resolved"} />
      <QuickFilter source="status" label="High Severity" defaultValue={"high"} />
      <QuickFilter source="status" label="Medium Severity" defaultValue={"medium"} />
      <QuickFilter source="status" label="Low Severity" defaultValue={"low"} />
    </Filter>
  );
};

export default ExceptionFilter;