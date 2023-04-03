import axios from "axios"
import { useState } from "react"
import useAuthContext from "../context/useAuthContext"


export default function TaskBox(prop){
    const[editask,seteditask]=useState(prop.task)
    const[editStage,seteditStage]=useState(false)
    const {user}=useAuthContext()
    
    axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`
    
    
    
    const handledelete=async()=>{
        await axios.delete(`/api/v1/${prop.id}`)
        .then(
            // console.log(`deleted ${prop.id}`)
        )  
    }
    const handledit=()=>{
        seteditStage((prev)=>!prev)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.patch(`/api/v1/${prop.id}`,{"_id":prop.id,"name":editask})
        .then(
            ()=>{
                handledit()
                // console.log(`edited ${prop.id}`)
            }
        )
    }

    return(
        <div className="bg-light container text-dark border p-2 d-flex justify-content-around align-items-center rounded rounded-2 mb-4"
        style={{"maxWidth":"600px","minWidth":"300px"}}>
            <div className="container text-break w-75">
                {!editStage && <h1 className="h3 fw-normal pt-1">{prop.task}</h1>}
                {editStage && 
                    <form onSubmit={handleSubmit} className="container-sm me-3">
                        <input type="text" 
                        className="form-control" 
                        onChange={(e)=>{seteditask(e.target.value)}} 
                        defaultValue={prop.task}
                        placeholder="Enter A Task..."/>
                        <button className="form-control btn btn-primary p-1 fs-6">Submit</button>
                    </form>}
            </div>
            <div className="container w-25">
                <button onClick={handledelete} className="border border-2 border-success btn btn-outline-success btn-sm p-3">✔</button>
                {!editStage &&
                <button onClick={handledit} className="border border-2 border-danger btn btn-outline-danger btn-sm p-3">✍</button>}
                {editStage &&
                <button onClick={handledit} className="border border-2 border-danger btn btn-outline-danger btn-sm p-3">❌</button>}
            </div>
        </div>
    )
}