import axios from "./axios-default";
import { catchGeneralError } from "../helpers/toast";

export function getUsers(){
    return axios.get("/api/users").catch(catchGeneralError)
}

export function getUser(id){
    return axios.get(`/api/users/${id}`).catch(catchGeneralError)
}
