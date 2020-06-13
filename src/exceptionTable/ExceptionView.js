import React from "react";
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
  Show,
  SimpleShowLayout,
  Tab,
  TabbedShowLayout
} from "react-admin";
import { Avatar, makeStyles, useTheme, Chip, Typography } from "@material-ui/core";
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

inlineField: {
    display: 'inline-block',
    width: '50%',
}
});

const ExceptionView = ({ selectedRow, ...props }) => {
  const classes = useListStyles();
  const theme = useTheme();
  return (
    <Show {...props}>
    <SimpleShowLayout>
    <h3>Exception Detail</h3>
        <DateField label="Time Generated" source="timeGenerated" showTime />
        <FunctionField label="Severity" source="severity" sortBy="severity" className={classes.inlineField}render={record => {
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

        <FunctionField label="Status" source="status" sortBy="status" className={classes.inlineField} render={record => {
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

      <TextField source="source" size="medium" className={classes.inlineField}/>
        <TextField source="category" className={classes.inlineField}/>
        <TextField label="Org. Unit" source="orgUnit.name" className={classes.inlineField}/>
        <TextField label="Business Component" source="businessComponent.name" className={classes.inlineField}/>
        <TextField source="description" className={classes.inlineField}/>
        <RichTextField label="Technical Description" source="technicalDescription" className={classes.inlineField}/>
        <DateField showTime label="Updated Time" source="updateTime" />
        <TextField source="comment" />
      </SimpleShowLayout>
      </Show>

  );
};


/*const ExceptionView = ({ selectedRow, ...props }) => {
  const classes = useListStyles();
  const theme = useTheme();
  return (
    <Show {...props}>
    <TabbedShowLayout>
      <Tab label="1">
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
        </Tab>
        <Tab label="2">
        <TextField label="Business Component" source="businessComponent.name" />
        <TextField label="Org. Unit" source="orgUnit.name" />
        <RichTextField label="Technical Description" source="technicalDescription" />
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
        </Tab>
        <Tab label="3">
        <DateField showTime label="Updated Time" source="updateTime" />
        <TextField source="comment" />
        </Tab>
      </TabbedShowLayout>
      </Show>
    );
      };*/
export default ExceptionView;
