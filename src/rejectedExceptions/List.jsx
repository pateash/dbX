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
    ShowButton,
    DateField,
    FunctionField,
    RichTextField,
    SelectInput,
    TextInput,
    Button,
    BulkDeleteButton,
    useMutation, useNotify, useRedirect, useRefresh, useUnselectAll, useDeleteMany,
} from 'react-admin';
// import { List, TextField, DateField, Datagrid, RichTextField, FunctionField, ChipField, EditButton } from 'react-admin';
import { Avatar, makeStyles, Chip, Typography } from "@material-ui/core";
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
        {/* <QuickFilter
            label="Enabled"
            source="isEnabled"
            defaultValue
        /> */}
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

const ApproveButton = ({ record }) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const [approve, { loading }] = useMutation(
        {
            type: 'delete',
            resource: 'rejectedException',
            payload: { id: record.id, data: { isApproved: true } },
        },
        {
            undoable: false,
            onSuccess: ({ data }) => {
                // redirect('/rejectedException');
                refresh();
                notify('approved', 'info', {}, false);
            },
            onFailure: (error) => notify(`Error: ${error.message}`, 'warning'),
        }
    );
    return <Button label="Approve" onClick={approve} disabled={loading} />;
};

const ApproveExceptionsButton = ({ selectedIds }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useMutation(
        {
            type: 'delete',
            resource: 'rejectedException',
            payload: { ids: selectedIds },
        },
        {
            undoable: false,
            onSuccess: () => {
                refresh();
                notify('Posts updated');
                unselectAll('rejectedException');
            },
            onFailure: (error) => {
                refresh();
                notify(`Error for some exceptions`, 'warning');
                unselectAll('rejectedException');
            },
        }
    );

    return (
        <Button
            label="Approve"
            disabled={loading}
            onClick={updateMany}
        >
        </Button>
    );
};

const ExceptionBulkActionButtons = props => (
    <React.Fragment>
        <ApproveExceptionsButton {...props} />
        {/* <BulkDeleteButton {...props} label="Approve" /> */}
    </React.Fragment>
);

export const RejectedExceptionList = props => {
    const classes = useStyles();

    return (
        <List
            {...props}
            filters={<ExceptionFilter />}
            bulkActionButtons={<ExceptionBulkActionButtons />}
        >
            <Datagrid rowClick="">
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
                <FunctionField label="Business Component" source="businessComponent" sortBy="businessComponent" render={record => {
                    return <Typography style={{
                        background: record.businessComponent.includes(',-') ? 'red' : null,
                        color: record.businessComponent.includes(',-') ? 'white' : 'black',
                    }}>{record.businessComponent.replace(',-', '')}</Typography>
                }} />
                {/* <TextField style={{ color: 'red' }} label="Business Component" source="businessComponent" /> */}
                <FunctionField label="Org. Unit" source="orgUnit" sortBy="orgUnit" render={record => {
                    return <Typography style={{
                        background: record.orgUnit.includes(',-') ? 'red' : null,
                        color: record.orgUnit.includes(',-') ? 'white' : 'black',
                    }}>{record.orgUnit.replace(',-', '')}</Typography>
                }} />
                <RichTextField label="Technical Description" source="technicalDescription" />
                <ShowButton />
                <ApproveButton />
            </Datagrid>
        </List>
    )
};