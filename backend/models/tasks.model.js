const mongoose=require("mongoose")

const TaskSchema= new mongoose.Schema({
    name:{
        type:String,
        
    },
    completed:{
        type:String,
        
    },
    user_id:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Tasks',TaskSchema)