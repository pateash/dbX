import React from "react";
import { List, TextField, DateField, Datagrid, RichTextField, FunctionField, ChipField, EditButton } from 'react-admin';
import { Avatar, makeStyles, useTheme, Chip } from "@material-ui/core";
import { green, red, yellow } from '@material-ui/core/colors';

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

const ExceptionTable = ({ selectedRow, ...props }) => {
  const classes = useListStyles();
  const theme = useTheme();
  return (
      <Datagrid
        rowClick="edit"
        classes={{
          headerRow: classes.headerRow,
          headerCell: classes.headerCell,
          rowCell: classes.rowCell,
        }}
        optimized
        {...props}
      >
        <DateField source="timeGenerated" />
        <TextField source="source" />
        <TextField source="category" />
        <TextField source="description" />
        <FunctionField
          label="Severity"
          render={(record) => {
            var avatarClass;
            var chipColor;
            const severity = record.severity.toLowerCase();
            switch (severity) {
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
            }

            return (
              <>
                <Chip
                  variant="outlined"
                  avatar={
                    <Avatar className={avatarClass} variant="circle">
                      {" "}
                    </Avatar>
                  }
                  label={severity.toUpperCase()}
                  style={{
                    color: chipColor,
                  }}
                />
              </>
            );
          }}
        />
        <TextField source="businessComponent" />
        <TextField source="orgUnit" />
        <RichTextField source="technicalDescription" />
        <FunctionField
          label="Status"
          render={(record) => {
            var avatarClass;
            var chipColor;
            const status = record.status.toLowerCase();
            switch (status) {
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
              <>
                <Chip
                  variant="outlined"
                  avatar={
                    <Avatar className={avatarClass} variant="circle">
                      {" "}
                    </Avatar>
                  }
                  label={status.toUpperCase()}
                  style={{
                    color: chipColor,
                  }}
                />
              </>
            );
          }}
        />
        <TextField source="updateTime" />
        <TextField source="comment" />
      </Datagrid>

  );
};
export default ExceptionTable;
