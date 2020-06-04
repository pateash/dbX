import { AuthProvider } from 'ra-core';

const AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request("https://mydomain.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const response = await fetch(request);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    const { token } = await response.json();
    localStorage.setItem("token", token);

    //set custom headers 
    //headers.set('Authorization', `Bearer ${token}`);
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () =>
    localStorage.getItem("token")
      ? Promise.resolve()
      : Promise.reject({ redirectTo: "/login" }), //no-access
  getPermissions: () => Promise.reject("Unknown method"),

};

export default AuthProvider;
