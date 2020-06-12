import * as React from "react";
import { Edit, TextInput, SelectInput, SimpleForm } from "react-admin";

const ExceptionEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="source" />
        <TextInput disabled source="category" />
        <TextInput disabled source="description" />
        <SelectInput
          source="status"
          choices={[
            { id: "STATUS_UNRESOLVED", name: "Unresolved" },
            { id: "STATUS_RESOLVED", name: "Resolved" },
          ]}
        />
        <TextInput source="comment" />
      </SimpleForm>
    </Edit>
  );
};

export default ExceptionEdit;