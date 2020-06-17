// const serverBaseUrl = 'http://localhost:8080';
const serverBaseUrl = 'http://dbx-dbx.192.168.42.23.nip.io';

var config = {
    apiUrl: `${serverBaseUrl}/api`,
    loginUrl: `${serverBaseUrl}/auth/signin`,
    registerUrl: `${serverBaseUrl}/auth/signup`,
    registerOrgUnitUrl: `${serverBaseUrl}/auth/orgUnit`,
}

export default config
