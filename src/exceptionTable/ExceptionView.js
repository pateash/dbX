import React, { useState } from "react";
import {
  List,
  TextField,
  DateField,
  Datagrid,
  RichTextField,
  FunctionField,
  EditButton,
  ShowButton,
  Show,
  SimpleShowLayout,
  Tab,
  Pagination,
  ReferenceManyField,
  Error,
  Loading,
  useQuery,
  CardContentInner
} from "react-admin";
import { Avatar, makeStyles, useTheme, Chip, Typography, Button, Dialog, Grid, InputLabel, Card, CardContent, CardHeader, ExpansionPanel } from "@material-ui/core";
import { green, red, yellow } from "@material-ui/core/colors";
// import { CardContainer } from 'ra-ui-materialui/lib/layout';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExceptionFilter from "./ExceptionFilter";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useRecordVersionsStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
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

const OldExceptionsList = ({ id }) => {

}

const ExceptionTitle = ({ record }) => {
  return <span>{record ? `${record.category}` : ''}</span>;
};

const GridField = ({ label, child }) => {
  return <Grid item xs={12} md={12}>
    <InputLabel style={{ paddingBottom: 2 }}>
      {label}
    </InputLabel>
    {child}
  </Grid>
}

const GridTextField = ({ label, value }) => {
  const child = <>
    {value.split("\n").map(v => (
      <Typography component="p" variant="body1">{v}</Typography>
    ))}
  </>
  return <GridField label={label} child={child} />
}

const GridDateField = ({ label, date }) => {
  const dateStr = new Date(date).toLocaleString();
  return <GridTextField label={label} value={dateStr} />
}

const ChipField = ({ value, range }) => {
  const classes = useListStyles();
  var avatarClass;
  var chipColor;
  const color = range[value];
  switch (color) {
    case "red":
      avatarClass = classes.redCircle;
      chipColor = red[500];
      break;
    case "yellow":
      avatarClass = classes.yellowCircle;
      chipColor = yellow[500];
      break;
    case "green":
      avatarClass = classes.greenCircle;
      chipColor = green[500];
      break;
  }

  return <Chip
    variant="outlined"
    avatar={<Avatar className={avatarClass} variant="circle"> </Avatar>}
    label={value.toUpperCase()}
    style={{
      color: chipColor,
    }}
  />;
}

const GridChipField = ({ label, value, range }) => {
  return <GridField label={label} child={<ChipField value={value} range={range} />} />
}

const ExceptionRecordVersions = ({ id }) => {
  const classes = useRecordVersionsStyles();
  const { data, loading, error } = useQuery({
    type: 'getManyReference',
    resource: 'oldException',
    payload: { id }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  console.log("versions", data);

  return <TableContainer>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Version</TableCell>
          <TableCell>Business Component</TableCell>
          <TableCell>Severity</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Technical Description</TableCell>
          <TableCell>Comment</TableCell>
          <TableCell>Updated Time</TableCell>
          <TableCell>Compare</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, version, businessComponent, status, severity, comment, technicalDescription, updateTime }) => (
          <TableRow key={id}>
            <TableCell>{version}</TableCell>
            <TableCell>{businessComponent.name}</TableCell>
            <TableCell><ChipField value={severity.split("_")[1].toLowerCase()} range={{ 'low': 'green', 'medium': 'yellow', 'high': 'red' }} /></TableCell>
            <TableCell><ChipField value={status.split("_")[1].toLowerCase()} range={{ 'resolved': 'green', 'unresolved': 'red' }} /></TableCell>
            <TableCell>
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={classes.heading}>See Techincal Description</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {technicalDescription.split("\n").map(v => (
                      <Typography component="p" variant="body1">{v}</Typography>
                    ))}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </TableCell>
            <TableCell>{comment}</TableCell>
            <TableCell>{new Date(updateTime).toLocaleString()}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" onClick={() => {
                // console.log("record", record);
              }} >
                Compare
                </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

const ExceptionRecord = ({ title, category, source, severity, status, businessComponent, timeGenerated, technicalDescription, comment, description, updateTime }) => {
  return <Grid container item spacing={2} >
    <Grid item xs={12}>
      <Typography variant="h6">{title}</Typography>
    </Grid>
    <GridTextField label="Category" value={category} />
    <GridTextField label="Source" value={source} />
    <GridTextField label="Business Component" value={businessComponent.name} />
    <GridTextField label="Description" value={description} />
    <GridChipField label="Severity" value={severity.split("_")[1].toLowerCase()} range={{ 'low': 'green', 'medium': 'yellow', 'high': 'red' }} />
    <GridChipField label="Status" value={status.split("_")[1].toLowerCase()} range={{ 'resolved': 'green', 'unresolved': 'red' }} />
    <GridDateField label="Time Generated" date={timeGenerated} />
    <GridDateField label="Time Updated" date={updateTime} />
    <GridTextField label="Comment" value={comment} />
    <GridTextField label="Techincal Description" value={technicalDescription} />
  </Grid>
}

const ExceptionView = ({ selectedRow, ...props }) => {
  const classes = useListStyles();
  const theme = useTheme();
  const [showCompare, setCompare] = useState(false);
  const [recordCompare, setRecordCompare] = useState({});
  const [latestCompare, setLatestCompare] = useState(null);
  const handleClose = () => { setCompare(false) };
  /* const { data, loading, error } = useQuery({
    type: 'getOne',
    resource: 'exception',
    payload: { id: props.id }
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return <Card style={{ padding: 16, marginTop: 16 }}>
    <CardHeader title={data.category} />
    <CardContent >
      <Grid spacing={2} style={{ padding: 4 }}>
        <Grid item xs={12}>
          <ExceptionRecord {...data} />
        </Grid>
        <Grid item xs={12}>
          <ExceptionRecordVersions id={props.id} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>; */

  return (
    <Show title={<ExceptionTitle />} {...props}>
      <SimpleShowLayout>
        <FunctionField label="" source="category" sortBy="category" render={record => {
          return <h2>{record.category ?? ''}</h2>
        }} />
        <DateField label="Time Generated" source="timeGenerated" showTime className={classes.inlineField} />
        <DateField showTime label="Updated Time" className={classes.inlineField} source="updateTime" />
        <FunctionField label="Severity" source="severity" sortBy="severity" className={classes.inlineField} render={record => {
          if (latestCompare === null) {
            setLatestCompare(record);
          }
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

        <TextField source="source" size="medium" className={classes.inlineField} />
        <TextField source="category" className={classes.inlineField} />
        <TextField label="Business Component" source="businessComponent.name" className={classes.inlineField} />
        <TextField source="description" className={classes.inlineField} />
        <TextField source="comment" />
        <TextField multiline label="Technical Description" source="technicalDescription" />

        <ReferenceManyField /* pagination={<Pagination />} */ label="Versions" reference="oldException" target="exceptionId">
          <Datagrid>
            <TextField source="version" sortable={false} />
            <FunctionField label="Severity" render={record => {
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

            <FunctionField label="Status" render={record => {
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

            <TextField sortable={false} label="Business Component" source="businessComponent.name" />
            <TextField sortable={false} label="Technical Description" source="technicalDescription" />
            <DateField sortable={false} showTime label="Updated Time" source="updateTime" />
            <TextField sortable={false} source="comment" />

            <FunctionField label="Compare" render={record => {
              return <>
                <Button variant="contained" color="primary" onClick={() => {
                  console.log("record", record);
                  setRecordCompare(record);
                  setCompare(true);
                }} >
                  Compare
                </Button>
              </>
            }} />
          </Datagrid>
        </ReferenceManyField>
        <Dialog
          fullWidth
          maxWidth="md"
          open={showCompare}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Comparing Latest Version with Version {recordCompare.version}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={2} xs={12}>
                <Grid item container xs={12} md={6}>
                  <ExceptionRecord title="Latest Version" {...latestCompare} />
                </Grid>
                <Grid item container xs={12} md={6}>
                  <ExceptionRecord title={`Version: ${recordCompare.version}`} {...latestCompare} {...recordCompare} />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
          </Button>
          </DialogActions>
        </Dialog>
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
