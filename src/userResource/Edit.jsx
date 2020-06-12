import * as React from "react";
import {
    SimpleForm,
    TextInput,
    BooleanInput,
    Edit,
} from 'react-admin';

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            {/* <TextInput source="orgUnit" label="Org. Unit" /> */}
            <BooleanInput source="isEnabled" label="Account Enabled" />
        </SimpleForm>
    </Edit>
);