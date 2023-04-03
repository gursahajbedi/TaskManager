const user=require("../models/user.model")
const Tasks=require("../models/tasks.model")

const getAllTasks = (req,res)=>{
    const user_id=req.user._id
    Tasks.remove({})
    Tasks.find({user_id},(err,data)=>{
        if(err){
            throw err
        }
        res.json(data)
    })
}

const createTask =async (req,res)=>{
    const {name,completed}=req.body
    const user_id=req.user._id
    const task = await Tasks.create({name,completed,user_id})
    task.save((err)=>{
        if(err){
            throw err
        }
    })
    res.json(task)
    
}

const updateTask = async(req,res)=>{
    const id=req.params.id
    try{
        const update= await Tasks.findOneAndUpdate({_id:id},req.body)
        res.status(200).json({updated:update.id})
    }
    catch(err){
        res.status(404).json({msg:`No id found by: ${id}`})
    }
}

const deleteTask =async (req,res)=>{
    const id=req.params.id
    try{
        const del=await Tasks.findByIdAndDelete({_id:id})
        res.status(200).json({deleted:del})
    }
    catch(err){
        res.status(404).json({msg:`No id found named by: ${id}`})
    }
}

const getTask =async (req,res)=>{
    const id=req.params.id
    try{
        const find=await Tasks.findOne({_id:id})
        res.status(200).json(find)
    }
    catch(err){
        res.status(404).json({msg:`No id named by: ${id}`})
    }
}





module.exports={getAllTasks,createTask,updateTask,deleteTask,getTask}


