//import './App.css';

import * as React from "react";
import { Admin } from 'ra-core';

import {Login, Logout, authProvider} from './user';

const App = () => (
    <Admin loginPage={Login} logoutButton={Logout} authProvider={authProvider} />
);

export default App;
