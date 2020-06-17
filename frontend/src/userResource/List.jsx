import * as React from 'react';
import Button from '@material-ui/core/Button';

import { Children, Fragment, cloneElement, memo } from 'react';
import BookIcon from '@material-ui/icons/Book';
import Chip from '@material-ui/core/Chip';
import { useMediaQuery, makeStyles } from '@material-ui/core';

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
} from 'react-admin';

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

const UserFilter = props => (
    <Filter {...props}>
        {/* <QuickFilter
            label="Enabled"
            source="isEnabled"
            defaultValue
        /> */}
        <NullableBooleanInput
            label="View Enabled"
            source="isEnabled"
            displayNull
        />
        {/* <BooleanInput label="View Enabled" source="isEnabled" /> */}
    </Filter>
);

export const UserList = props => (
    <List
        {...props}
        filters={<UserFilter />}
    >
        <Datagrid isRowSelectable={() => false}>
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="orgUnit.name" label="Org. Unit" />
            <BooleanField source="isEnabled" label="Account Enabled" />
            <EditButton />
        </Datagrid>
    </List>
);
