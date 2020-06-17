import * as React from "react";

import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    useTranslate,
    Filter,
    BooleanInput,
    NullableBooleanInput,
    DateField,
    FunctionField,
    RichTextField,
    SelectInput,
    TextInput,
} from 'react-admin';
// import { List, TextField, DateField, Datagrid, RichTextField, FunctionField, ChipField, EditButton } from 'react-admin';
import { Avatar, makeStyles, Chip } from "@material-ui/core";
import { green, red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
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
}));


const useQuickFilterStyles = makeStyles(theme => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));

const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={translate(label)} />;
};

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

export const ExceptionList = props => {
    const classes = useStyles();

    return (
        <List
            {...props}
            filters={<ExceptionFilter />}
        >
            <Datagrid rowClick="show">
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
                <DateField showTime label="Updated Time" source="updateTime" />
                <TextField source="comment" />
                <EditButton />
            </Datagrid>
        </List>
    )
};