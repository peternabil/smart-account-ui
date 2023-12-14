import { catchGeneralError } from "../helpers/toast";
import axios from "./axios-default";


export function getPriorities(){
    return axios.get("/api/priority").catch(catchGeneralError)
}

export function getPriority(id){
    return axios.get(`/api/priority/${id}`).catch(catchGeneralError)
}

export function createPriority(Name, Description, Level){
    return axios.post('api/priority', {Title, Description, Level}).catch(catchGeneralError)
}

export function editPriority(Title, Description, Level){
    return axios.put('api/priority', {Title, Description, Level}).catch(catchGeneralError)
}
