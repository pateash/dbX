import * as React from "react";
import {
  Edit, TextInput, SelectInput, SimpleForm, Loading, Error, AutocompleteInput,
  useQuery,
} from "react-admin";

const ExceptionEdit = (props) => {
  const { data, loading, error } = useQuery({
    type: 'getList',
    resource: 'businessComponent',
    payload: { pagination: { page: 1, perPage: 5000 }, sort: {}, filter: {} },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <Edit {...props}>
      <SimpleForm>
        <h3>Update Exception</h3>
        <SelectInput
          source="severity"
          choices={[
            { id: "SEVERITY_HIGH", name: "High" },
            { id: "SEVERITY_MEDIUM", name: "Medium" },
            { id: "SEVERITY_LOW", name: "Low" },
          ]}
        />
        <SelectInput
          source="status"
          choices={[
            { id: "STATUS_UNRESOLVED", name: "Unresolved" },
            { id: "STATUS_RESOLVED", name: "Resolved" },
          ]}
        />
        <TextInput multiline  source="technicalDescription" />
        <TextInput source="comment" />
        <AutocompleteInput
          source="businessComponent.id"
          choices={data}
        />
      </SimpleForm>
    </Edit>
  );
};

export default ExceptionEdit;