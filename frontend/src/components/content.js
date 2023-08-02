import { useEffect, useState } from "react"
import axios from "axios"
import TaskBox from "./task"
import useAuthContext from "../context/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import WebFont from "webfontloader"
import "./content.css"

export default function Content(){
    //Saving the tasks in variables
    const[Task, setTask]=useState()
    const[Data,setData]=useState("No Tasks available right now....")
    const {user}=useAuthContext()
    const {logout}=useLogout()
    axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`

    function handleClick(){
        logout()
    }

    useEffect(()=>{
        getalltasks()
        WebFont.load({
            google:{
                families:['Poppins']
            }
        })
    })

    const getalltasks=async()=>{
        await axios.get("https://task-manager-pw0j.onrender.com/api/v1").then((res)=>{
            let data=res.data
            
            const newarr=data.map((item)=>{
                return <TaskBox task={item.name} id={item._id} func={getalltasks}/>
            })
            if(newarr.length===0){
                const nores="No Tasks available right now...."
                setData(nores)
            }
            else{
                setData(newarr)
            }
            
        })
    }

    //handling submit feature

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.post("https://task-manager-pw0j.onrender.com/api/v1/",{"name":Task})
        getalltasks()
    }
    const handleSubmitBtn=async(e)=>{
        e.preventDefault()
        await axios.post("https://task-manager-pw0j.onrender.com/api/v1/",{"name":Task})
        getalltasks()
    }
    
    
    return(
        <div className="container-fluid text-light mt-5" style={{"fontFamily":"'Poppins'"}}>
            <div className="mb-5 pb-5">
                <nav class="navbar navbar-light bg-light">
                    <div class="container-fluid">
                         <h1 className="text-dark p-2 mt-2">Task Manager</h1>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <div className="text-dark container-fluid mt-2"><h4>Logged in as @{user.username}</h4></div>
                                </li>
                                <li>
                                    <div className="text-dark container-fluid mt-2" onClick={handleClick}><h4>Logout</h4></div>                
                                </li>
                              </ul>
                            </div>
                          </div>
                        </nav>
            </div>
            <div className="d-flex flex-column align-items-center text-center">
                <form onSubmit={handleSubmit}>
                    <div className="border-bottom border-danger">
                        <div className="display-1">Task Manager</div>
                        <div style={{"fontSize":"22px"}} className="pb-4">By Gursahaj Singh</div>
                    </div>
                    <input type="text" 
                        className="form-control mt-5 mb-4" 
                        onChange={(e)=>{setTask(e.target.value)}} 
                        style={{"fontSize":"28px"}}
                        placeholder="Enter A Task..."/>
                    <input type="submit" value="Submit" className="btn btn-primary" onClick={handleSubmitBtn} style={{"fontSize":"22px"}}/>
                </form>
                <div className="container" style={{"fontSize":"22px"}}>
                    <br/>
                    {Data}
                </div>
            </div>
        </div>
    )
}