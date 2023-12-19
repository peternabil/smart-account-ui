import { catchGeneralError } from "../helpers/toast";
import axios from "./axios-default";

export function getDialySpending(startDate, endDate, negative){
    return axios.get(`/api/daily?negative=${negative}&start_date=${startDate}&end_date=${endDate}`).catch(catchGeneralError)
}
export function getHighestCategory(startDate, endDate, negative){
    return axios.get(`/api/highest-cat?negative=${negative}&start_date=${startDate}&end_date=${endDate}`).catch(catchGeneralError)
}
export function getHighestPriority(startDate, endDate, negative){
    return axios.get(`/api/highest-prio?negative=${negative}&start_date=${startDate}&end_date=${endDate}`).catch(catchGeneralError)
}