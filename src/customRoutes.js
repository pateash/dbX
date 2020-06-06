import * as React from "react";
import { Route } from 'react-router-dom';
import Signup from "./user/Signup";

export default [
    <Route exact path="/register" component={Signup} />,
];
