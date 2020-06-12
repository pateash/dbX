import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
} from 'react-admin';

export const OrgUnitList = props => (
    <List {...props} click="">
        <Datagrid isRowSelectable={() => false} rowClick="">
            <TextField source="name" />
        </Datagrid>
    </List>
);