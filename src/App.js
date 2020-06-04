//import './App.css';

import * as React from "react";
import { Admin } from 'ra-core';
import dataProvider from 'api/dataProvider'

import {Login, Logout, authProvider} from './user';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = springbootrest('http://localhost:3000/api', httpClient);

const App = () => (
    <Admin loginPage={Login} logoutButton={Logout} authProvider={authProvider} />
);

export default App;
