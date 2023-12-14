import { catchGeneralError } from "../helpers/toast";
import axios from "./axios-default";


export function getCategories(){
    return axios.get("/api/category").catch(catchGeneralError)
}

export function getCategory(id){
    return axios.get(`/api/category/${id}`).catch(catchGeneralError)
}

export function createCategory(Title, Description){
    return axios.post('api/category', {Title, Description}).catch(catchGeneralError)
}

export function editCategory(Title, Description){
    return axios.put('api/category', {Title, Description}).catch(catchGeneralError)
}
