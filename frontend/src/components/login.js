import WebFont from "webfontloader"
import { useState,useEffect } from "react"
import { NavLink } from "react-router-dom"
import useLogin from "../hooks/useLogin"

export default function Login(){
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const {login,err}=useLogin()
    

    function handleSubmit(e){
        e.preventDefault()
        login(email,password)
    }
    useEffect(()=>{
        WebFont.load({
            google:{
                families:['Poppins']
            }
        })
    },[])

    return(
        <div className="container-fluid bg-dark d-flex flex-column justify-content-center text-light py-4" style={{"fontFamily":"'Poppins'", "minHeight":"100vh"}}>
            <div className="bg-dark text-light display-5 fw-bold p-2 border-5 border-bottom border-danger container pb-4 mb-4 text-center">
                <div className="display-2">Task Manager</div>
            </div>
            <div className="container mt-3" style={{"fontFamily":"'Poppins'"}}>
                <div className="text-center display-4">Login</div>
                <div className='text-center'>
                    <form className='container my-3' onSubmit={handleSubmit} >
                        <input type="email" className='form-control mt-4 fs-1' id="email" placeholder='Email'
                        onChange={(e)=>{setemail(e.target.value)}} style={{fontSize:"28px"}}/>
                        <input type="password" className='form-control mt-4 fs-1' id="password" placeholder='Password' 
                        onChange={(e)=>{setpassword(e.target.value)}} style={{fontSize:"28px"}}/>
                        <div className='my-3 fs-4 text-danger' style={{fontFamily:"monospace"}}>{err}</div>
                        <input type="submit" className='my-3 btn btn-light' value="Proceed" style={{fontSize:"22px"}}/>
                    </form>
                    <div className="h2 my-2">Dont have An Account?</div>
                    <NavLink className="h3 text-decoration-none text-light border-bottom border-danger border-5" to={"/TM/signup"}>Signup here</NavLink>    
                    
                </div>
            </div>
        </div>
    )
}