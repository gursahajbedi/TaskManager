const mongoose=require("mongoose")

module.exports=mongoose.model("User",mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    }

}))