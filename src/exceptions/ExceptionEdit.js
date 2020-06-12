import React from 'react';
import {
    useEditController,
    useTranslate,
    TextInput,
    SimpleForm,
    DateField,
} from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ExceptionEditToolbar from './ExceptionEditToolbar';
import { TextField } from '@material-ui/core';
import ExceptionTable from './ExceptionTable';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
}));

const ExceptionEdit = ({ onCancel, ...props }) => {
        const classes = useStyles();
    const controllerProps = useEditController(props);
    //const translate = useTranslate();
    if (!controllerProps.record) {
        return null;
    }
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6">
                    Resolve Exception
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <SimpleForm
                className={classes.form}
                basePath={controllerProps.basePath}
                record={controllerProps.record}
                save={controllerProps.save}
                version={controllerProps.version}
                redirect="exception"
                resource="exceptions"
                toolbar={<ExceptionEditToolbar />}
            >
                <TextField source="source" formClassName={classes.inlineField} />
                <TextInput source="comment" rowsMax={15} multiline fullWidth />
            </SimpleForm>
        </div>
    );
};
export default ExceptionEdit;