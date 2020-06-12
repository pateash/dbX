import * as React from "react";
import { Filter, SelectInput, TextInput } from "react-admin";
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

/* const QuickFilter = ({ defaultValue }) => {
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
}; */


const ExceptionFilter = props => (
  <Filter {...props}>
    <SelectInput source="severity" choices={[
      { id: 'high', name: 'High' },
      { id: 'medium', name: 'Medium' },
      { id: 'low', name: 'Low' },
    ]} />
    <SelectInput source="status" choices={[
      { id: 'resolved', name: 'Resolved' },
      { id: 'unresolved', name: 'Unresolved' },
    ]} />
    <SelectInput source="severityOrder" label="Severity Order" choices={[
      { id: 'asc', name: 'Low to High' },
      { id: 'desc', name: 'High to Low' },
    ]} />
    <TextInput source="category" />
    <TextInput source="source" />
    {/* <BooleanInput label="View Enabled" source="isEnabled" /> */}
  </Filter>
);

export default ExceptionFilter;