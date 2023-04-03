import axios from "axios"
import useAuthContext from "../context/useAuthContext"
import { useState } from "react"


export default function useLogin(){
    
    const {dispatch}=useAuthContext()
    const [err,seterr]=useState('')

    async function login(email,password){
        const body={"email":email,"password":password}
        const res=await axios.post("/auth/login",body).then((res)=>{return res}).catch((res)=>{return res})
        if(res.status===200){
            //updating the local storage
            localStorage.setItem("user",JSON.stringify(res.data))
            //updating the Auth Context
            dispatch({type:"LOGIN",payload:res.data})
        }
        else{
            seterr(res.response.data.err)
        }
    }
    return {login,err}
}