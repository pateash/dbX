const localServerBaseUrl = 'http://localhost:8080';
// const openShiftServerBaseUrl = 'http://dbx-dbx.192.168.42.23.nip.io';
const openShiftServerBaseUrl = 'http://dbx-dbx.apps.123.252.203.195.nip.io/';

const serverBaseUrl = process.env.NODE_ENV === "development" ? localServerBaseUrl : openShiftServerBaseUrl;

var config = {
    apiUrl: `${serverBaseUrl}/api`,
    loginUrl: `${serverBaseUrl}/auth/signin`,
    registerUrl: `${serverBaseUrl}/auth/signup`,
    registerOrgUnitUrl: `${serverBaseUrl}/auth/orgUnit`,
}

export default config
