const serverBaseUrl = 'http://localhost:8080';

var config = {
    apiUrl: `${serverBaseUrl}/api`,
    loginUrl: `${serverBaseUrl}/auth/signin`,
    registerUrl: `${serverBaseUrl}/auth/signup`,
    registerOrgUnitUrl: `${serverBaseUrl}/auth/orgUnit`,
}

export default config