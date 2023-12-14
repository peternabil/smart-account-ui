import axios from "react-axios"


export function signup(Email, FirstName, LastName, Password){
    return axios.Post(`${process.env.REACT_API_URL}/signup`, {Email, FirstName, LastName, Password})
}

export function login(Email, Password){
    axios.Post(`${process.env.REACT_API_URL}/login`, {Email, Password}).then((res) => {
        console.log(res.data)
    }, err => {
        console.error(err)
    })
}