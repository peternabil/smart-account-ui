import { catchGeneralError } from "../helpers/toast";
import axios from "./axios-default";


export function getTransactions(page, pageSize){
    return axios.get(`/api/transaction?page=${page}&page_size=${pageSize}`).catch(catchGeneralError)
}

export function getTransaction(id){
    return axios.get(`/api/transaction/${id}`).catch(catchGeneralError)
}

export function createTransaction(Title, Category, Amount, Negative, Description, Priority){
    return axios.post('api/transaction', {Title, Category, Amount, Negative, Description, Priority}).catch(catchGeneralError)
}

export function editTransaction(Title, Category, Amount, Negative, Description, Priority){
    return axios.put('api/transaction', {Title, Category, Amount, Negative, Description, Priority}).catch(catchGeneralError)
}
