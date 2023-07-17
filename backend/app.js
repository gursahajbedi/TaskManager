const express=require("express")
const tasks=require("./routes/task.js")
const user=require("./routes/user.js")
const connectDB = require("./db/connect.js")
const bodyParser=require('body-parser')
const app= express()
const cors=require("cors")
require("dotenv").config()

const MONGO_URI=process.env.MONGO_URI

app.use(express.static("./module"))
app.use(bodyParser.urlencoded())
app.use(express.json())
app.use(cors())

//dont mind this

app.use('/api/',tasks)
app.use('/auth/',user)



const start = async() =>{
    try{
        await connectDB(MONGO_URI)
        app.listen(5000,console.log("running on port 5000...."))
    }catch(err){
        console.log(err)
    }
}
start()