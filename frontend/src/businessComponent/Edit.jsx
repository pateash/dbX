import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    Edit,
    BooleanInput,
} from 'react-admin';

export const BusinesscomponentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="name" />
            <TextInput label="Org. Unit" disabled source="orgUnit.name" />
            <BooleanInput source="isEnabled" />
        </SimpleForm>
    </Edit>
);