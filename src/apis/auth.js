import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem("auth.token");
}
export function getToken() {
  return localStorage.getItem("auth.token");
}
export function getUser() {
  localStorage.getItem("user_info");
}

export function saveToken(token) {
  localStorage.setItem("auth.token", token);
}

export function saveUserData(data) {
  localStorage.setItem("user_info", JSON.stringify(data));
}

export function getUserInfo() {
  const user = JSON.parse(localStorage.getItem("user_info"));
  return user || {};
}

export function signOut() {
  localStorage.removeItem("auth.token");
  window.location.href = "/login";
}
export function signup(Email, FirstName, LastName, Password){
    return axios.post(`/signup`, {Email, FirstName, LastName, Password})
}

export function login(Email, Password){
    axios.post(`/login`, {Email, Password}).then((res) => {
        const token = res.data.access_token;
        console.log(token)
        // setAuthToken(token);
        // saveToken(token);
        // saveUserData(res.data.user_info);
        window.location.href = "/";
    }, err => {
        console.error(err)
    })
}