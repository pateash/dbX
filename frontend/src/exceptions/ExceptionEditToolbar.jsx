import React, { Fragment } from 'react';
import MuiToolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import { SaveButton, DeleteButton } from 'react-admin';
import ResolveButton from './ResolveButton';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const ExceptionEditToolbar = ({
    basePath,
    handleSubmitWithRedirect,
    invalid,
    record,
    resource,
    saving,
}) => {
    const classes = useStyles();
    return (
        <MuiToolbar className={classes.root}>
            {record.status.toLowerCase() === 'unresolved' ? (
                <Fragment>
                    <ResolveButton record={record} />
                </Fragment>
            ) : (
                <Fragment>
                    <SaveButton
                        handleSubmitWithRedirect={handleSubmitWithRedirect}
                        invalid={invalid}
                        saving={saving}
                        redirect="exception"
                        submitOnEnter={true}
                    />
                    <DeleteButton
                        basePath={basePath}
                        record={record}
                        resource={resource}
                    />
                </Fragment>
            )}
        </MuiToolbar>
    );
};
export default ExceptionEditToolbar;