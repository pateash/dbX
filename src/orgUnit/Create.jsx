import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';

export const OrgUnitCreate = props => (
    <Create title="Create Organization Unit" {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);