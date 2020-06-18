import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
} from "react-admin";

export const BusinessComponentList = ({ permissions, ...props }) => (
  <List
    {...props}
    title="Business Components"
    click=""
    bulkActionButtons={false}
  >
    <Datagrid isRowSelectable={() => false} rowClick="">
      <TextField source="name" />
      {permissions === "ROLE_ADMIN" ? (
        <TextField label="Org. Unit" source="orgUnit.name" />
      ) : null}
      <BooleanField source="isEnabled" label="Approved" />
      {permissions === "ROLE_ADMIN" ? <EditButton /> : null}
    </Datagrid>
  </List>
);
