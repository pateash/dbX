//import './App.css';

import * as React from "react";
import { Admin, fetchUtils, ListGuesser, Resource } from 'react-admin';
import dataProvider from './api/dataProvider';

import { Login, Logout, authProvider } from './user';

const httpClient = (url, options = {}) => {
    console.log("url", url);
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
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
    <Admin title="dbX" loginPage={Login} logoutButton={Logout} authProvider={authProvider} dataProvider={dataProvider('http://localhost:8080/api', httpClient)}>
        <Resource name="exception" key="exceptions" options={{ label: 'Exceptions' }} list={ListGuesser} />
    </Admin>
);

export default App;
