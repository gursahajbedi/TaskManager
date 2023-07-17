import axios from "axios"
import useAuthContext from "../context/useAuthContext"
import { useState } from "react"


export default function useSignup(){
    
    const {dispatch}=useAuthContext()
    const [err,seterr]=useState('')

    async function signup(email,password,username){
        const body={"email":email,"password":password,"username":username}
        const res=await axios.post("https://task-manager-pw0j.onrender.com/auth/signup",body).then((res)=>{return res}).catch((res)=>{return res})
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
    return {signup,err}
}
