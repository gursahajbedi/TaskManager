import { useEffect, useState } from "react"
import axios from "axios"
import TaskBox from "./task"
import useAuthContext from "../context/useAuthContext"
import { useLogout } from "../hooks/useLogout"

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
    },[Task,Data])

    const getalltasks=async()=>{
        await axios.get("/api/v1").then((res)=>{
            let data=res.data
            const newarr=data.map((item)=>{
                return <TaskBox task={item.name} id={item._id}/>
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
        await axios.post("/api/v1/",{"name":Task})
    }
    
    
    return(
        <div className="container-fluid text-light">
            <div className="d-flex flex-column align-items-center text-center" style={{"height":"100vh"}}>
                <form onSubmit={handleSubmit}>
                    <p className="rounded-2 btn btn-success mt-4">Logged in as @{user.username}</p>
                    <h1 className="display-1 my-3">Task Manager</h1>
                    <p className="fs-6">By Gursahaj Singh</p>
                    <input type="text" 
                        className="form-control fs-4 mt-5 mb-4" 
                        onChange={(e)=>{setTask(e.target.value)}} 
                        placeholder="Enter A Task..."/>
                    <input type="submit" value="Submit" className="btn btn-primary" onClick={handleSubmit}/>
                </form>
                <div className="container">
                    <br/>
                    {Data}
                </div>
                <div className="container mt-4">
                    <div className="btn btn-danger " onClick={handleClick}>Logout</div>
                </div>
            </div>
        </div>
    )
}