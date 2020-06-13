import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
} from 'react-admin';

export const BusinessComponentList = props => (
    <List {...props} title="Business Components" click="">
        <Datagrid isRowSelectable={() => false} rowClick="">
            <TextField source="name" />
        </Datagrid>
    </List>
);