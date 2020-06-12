import * as React from "react";
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';

export const RejectedExceptionEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput source="status" choices={[
                { id: 'STATUS_RESOLVED', name: 'Resolved' },
                { id: 'STATUS_UNRESOLVED', name: 'Unresolved' },
            ]} />
            <TextInput source="comment" />
        </SimpleForm>
    </Edit>
);