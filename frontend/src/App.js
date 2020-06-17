import * as React from "react";
import { Admin, fetchUtils, ListGuesser, ShowGuesser, EditGuesser, Resource } from 'react-admin';
import dataProvider from './api/dataProvider';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import { Login, Logout, authProvider } from './user';
import { UserList } from "./userResource/List";
import EditUser, { UserEdit } from "./userResource/Edit";
import { OrgUnitCreate } from "./orgUnit/Create";
import { OrgUnitList } from "./orgUnit/List";
// import { ExceptionList } from "./exceptions/List";
// import { ExceptionEdit } from "./exceptions/Edit";
// import { ExceptionShow } from "./exceptions/Show";
import { BusinessComponentList } from "./businessComponent/List";
import { BusinessComponentCreate } from "./businessComponent/Create";
import ExceptionTable from "./exceptionTable/ExceptionTable"
import ExceptionEdit from "./exceptionTable/ExceptionEdit";
import config from "./config";
import RejectedExceptionTable from "./rejectedExceptionTable/RejectedExceptionTable";
import ExceptionView from "./exceptionTable/ExceptionView";
import RejectedExceptionView from "./rejectedExceptionTable/RejectedExceptionView";
import { BusinesscomponentEdit } from "./businessComponent/Edit";
// import ExceptionFilter from "./exceptionTable/ExceptionFilter";

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

const Summary = () => {
    const [data, setData] = React.useState({
        lowCount: 1,
        highCount: 4,
        resolvedCount: 5,
    });

    return <div>
        <h1>
            Summary
        </h1>
        <p>{data.lowCount}</p>
        <p>{data.highCount}</p>
        <p>{data.resolvedCount}</p>
    </div>;
}

const App = () => (
    <Admin title="dbX" loginPage={Login} logoutButton={Logout} authProvider={authProvider} dataProvider={dataProvider(config.apiUrl, httpClient)}>
        {permissions => [
            /* User */
            /* permissions === 'ROLE_USER'
                ? <Resource icon={PostIcon} name="exception" key="exceptions" options={{ label: 'Exceptions' }} list={ExceptionList} show={ExceptionShow} edit={ExceptionEdit} />
                : null, */

            permissions === 'ROLE_USER' ? <Resource
                name="exception"
                list={ExceptionTable}
                show={ExceptionView}
                edit={ExceptionEdit}
                options={{ label: 'Exceptions' }}
            //filter={ExceptionFilter}
            /> : null,

            /* Admin */
            /* permissions === 'ROLE_ADMIN'
            ? <Resource icon={PostIcon} name="rejectedException" key="rejectedExceptions" options={{ label: 'Rejected Exceptions' }} list={RejectedExceptionEdit} show={RejectedExceptionShow} edit={RejectedExceptionEdit} />
            : null, */

            permissions === 'ROLE_ADMIN'
                ? <Resource icon={UserIcon} name="user" key="users" options={{ label: 'Users' }} list={UserList} edit={UserEdit} />
                : null,

            permissions === 'ROLE_ADMIN'
                ? <Resource icon={PostIcon} name="orgUnit" key="orgUnits" options={{ label: 'Org. Units' }} list={OrgUnitList} create={OrgUnitCreate} />
                : null,

            /* ? <Resource icon={PostIcon} name="rejectedException" key="rejectedExceptions" options={{ label: 'Rejected Exceptions' }} list={RejectedExceptionList} show={RejectedExceptionShow} edit={RejectedExceptionEdit} /> */
            permissions === 'ROLE_ADMIN'
                ? <Resource
                    options={{ label: 'Rejected Exceptions' }}
                    name="rejectedException"
                    list={RejectedExceptionTable}
                    show={RejectedExceptionView}
                //filter={ExceptionFilter}
                />
                : null,

            <Resource
                icon={PostIcon}
                edit={permissions === 'ROLE_ADMIN' ? BusinesscomponentEdit : null}
                name="businessComponent"
                key="businessComponents"
                options={{ label: 'Business Components' }}
                list={BusinessComponentList}
                create={permissions === 'ROLE_ADMIN' ? null : BusinessComponentCreate}
            />,
            <Resource
                name="oldException"
                key="oldExceptions"
            />,
            <Resource
                name="summary"
                key="summary"
                list={Summary}
                options={{ label: 'Summary' }}
            />,
        ]}
    </Admin>
);

export default App;
