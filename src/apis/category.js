import { catchGeneralError } from "../helpers/toast";
import axios from "./axios-default";


export function getCategories(){
    return axios.get("/api/category").catch(catchGeneralError)
}

export function getCategory(id){
    return axios.get(`/api/category/${id}`).catch(catchGeneralError)
}

export function createCategory(Name, Description){
    return axios.post('api/category', {Name, Description}).catch(catchGeneralError)
}

export function editCategory(Name, Description){
    return axios.put('api/category', {Name, Description}).catch(catchGeneralError)
}
