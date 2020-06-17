import React from 'react';
import { Fragment, useCallback } from 'react';

import classnames from 'classnames';
import { List } from 'react-admin';
import { Route, useHistory } from 'react-router-dom';
import { Drawer, useMediaQuery, makeStyles } from '@material-ui/core';

import BulkResolveButton from './BulkResolveButton';
import ExceptionTable from './ExceptionTable';
//import ExceptionFilter from './ExceptionFilter';
import ExceptionEdit from './ExceptionEdit';


const ExceptionsBulkActionButtons = props => (

    <Fragment>
        <BulkResolveButton {...props} />
    </Fragment>
);
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    list: {
        flexGrow: 1,
        transition: theme.transitions.create(['all'], {
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    listWithDrawer: {
        marginRight: 400,
    },
    drawerPaper: {
        zIndex: 100,
    },
}));

const ExceptionList = props => {

    const classes = useStyles();
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));

    const history = useHistory();

    const handleClose = useCallback(() => {
        history.push('/exception');
    }, [history]);
    return (
        <div className={classes.root}>
            <Route path="/exception/:id">
                {({ match }) => {
                    const isMatch = !!(
                        match &&
                        match.params &&
                        match.params.id !== 'create'
                    );
                    return (
                        <Fragment>
                            <List
                                {...props}
                                className={classnames(classes.list, {
                                    [classes.listWithDrawer]: isMatch,
                                })}
                               
                                bulkActionButtons={<ExceptionsBulkActionButtons />}
                                //filters={<ExceptionFilter />}
                                perPage={25}

                                sort={{ field: 'timeGenerated', order: 'DESC' }}
                            >
                                    <ExceptionTable
                                        selectedRow={
                                            isMatch &&
                                            parseInt(match.params.id, 10)

                                        }
                                    />
                            </List>
                            <Drawer
                                variant="persistent"
                                open={isMatch}
                                anchor="right"
                                onClose={handleClose}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                                {isMatch ? (
                                    <ExceptionEdit
                                        id={match.params.id}
                                        onCancel={handleClose}
                                        {...props}
                                    />
                                ) : null}
                            </Drawer>
                        </Fragment>
                    );
                }}
            </Route>
        </div>
    );
};
export default ExceptionList;