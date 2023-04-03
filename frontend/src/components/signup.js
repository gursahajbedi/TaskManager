import WebFont from 'webfontloader'
import {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import useSignup from "../hooks/useSignup"


export default function Signup(){
    
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    const [username,setusername]=useState("")
    const {signup,err}=useSignup()

    const handleSubmit=(e)=>{
        e.preventDefault()
        signup(email,password,username)
    }

    useEffect(()=>{
        WebFont.load({
            google:{
                families:['Bebas Neue']
            }
        })
    },[])
    return(
        <div className="container bg-dark d-flex flex-wrap justify-content-center text-light py-4">
            <div className="bg-dark text-light display-5 fw-bold p-2 border-5 border-bottom border-danger" >
                Task Manager
            </div>
            <div className="container mt-3" style={{"fontFamily":"'Bebas Neue'"}}>
                <div className="text-center h2">Signup</div>
                <div className='text-center'>
                    <form className='container my-3' onSubmit={handleSubmit}>
                        <input type="email" className='form-control my-3 fs-6' id="email" placeholder='Email'
                        onChange={(e)=>{setemail(e.target.value)}}/>
                        <input type="password" className='form-control my-3 fs-6' id="password" placeholder='Password' 
                        onChange={(e)=>{setpassword(e.target.value)}}/>
                        <input type="text" className='form-control my-3 fs-6' id="username" placeholder='Username' 
                        onChange={(e)=>{setusername(e.target.value)}}/>
                        <div className='my-3 fs-6 text-danger' style={{fontFamily:"monospace"}}>{err}</div>
                        <input type="submit" className='btn btn-light' value="Proceed"/>
                    </form>
                    <div>Already Have An Account?</div>
                    <NavLink className="text-decoration-none text-light border-bottom border-danger border-5" to={"/TM/login"}>Login here</NavLink>    
                </div>
            </div>
        </div>
    )
}