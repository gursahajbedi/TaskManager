import { useEffect, useState } from "react"
import axios from "axios"
import TaskBox from "./task"
import useAuthContext from "../context/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import WebFont from "webfontloader"

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
                families:['Bebas Neue']
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
        <div className="container-fluid text-light" style={{"fontFamily":"'Bebas Neue'"}}>
            <div className="d-flex justify-content-between mb-5">
                <div className="rounded-2 btn btn-success" style={{"fontSize":"28px"}}>Logged in as @{user.username}</div>
                <div className="btn btn-danger" style={{"fontSize":"28px"}} onClick={handleClick}>Logout</div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{"minHeight":"110vh"}}>
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