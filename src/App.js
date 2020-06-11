import * as React from "react";
import {
  Admin,
  fetchUtils,
  ShowGuesser,
  EditGuesser,
  Resource,
} from "react-admin";
import dataProvider from "./api/dataProvider";
import ExceptionTable from "./exceptionTable/ExceptionTable"
import ExceptionEdit from "./exceptionTable/ExceptionEdit";
import ExceptionFilter from "./exceptionTable/ExceptionFilter";
import { Login, Logout, authProvider } from "./user";

const httpClient = (url, options = {}) => {
  console.log("url", url);
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

/* const ExceptionsList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="source" />
        </Datagrid>
    </List>



); */

const App = () => (
  <Admin
    title="dbX"
    loginPage={Login}
    logoutButton={Logout}
    authProvider={authProvider}
    dataProvider={dataProvider("http://localhost:8081/api", httpClient)}
  >
    <Resource
      name="exception"
      list={ExceptionTable}
      show={ShowGuesser}
      edit={ExceptionEdit}
      //filter={ExceptionFilter}
    />
  </Admin>
);

export default App;
