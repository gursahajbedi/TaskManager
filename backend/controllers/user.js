const User=require("../models/user.model")
const validator=require("validator")
const {encrypt,passcompare,tokenize}=require("./hash.js")

const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email,!password){
        return res.status(404).send({err:"the parameters were not filled accordingly"})
    }
    if(!validator.default.isEmail(email)){
        return res.status(401).send({err:"the email is not correctly formatted"})
    }
    const found =await User.findOne({email}).then((res)=>{return res})
    if(!found){
        return res.status(402).send({err:"this email does not exists"})
    }
    const passMatch=await passcompare(password,found.password)
    if(!passMatch){
        return res.status(403).send({err:"incorrect password"})
    }

    const token=await tokenize(found._id)
    res.status(200).json({"username":found.username,"token":token})    
}
const signup=async(req,res)=>{
    const {email,password,username}=req.body
    if(!email,!password,!username){
        return res.status(404).send({err:"the parameters were not filled accordingly"})
    }
    if(!validator.default.isEmail(email)){
        return res.status(401).send({err:"the email is not correctly formatted"})
    }
    const find=await User.findOne({email}).then((res)=>{return res})
    if(find){
        return res.status(402).send({err:"this email is already in use"})
    }
    if(username.length<6 || username.length>25){
        return res.status(403).send({err:"length of a username should be between 6 and 25 characters."})
    }
    const find2=await User.findOne({username}).then((res)=>{return res})
    if(find2){
        return res.status(406).send({err:"this username is already in use, please enter a different one."})
    }
    if(!validator.default.isStrongPassword(password)){
        return res.status(405).send({err:"Please enter a strong password"})
    }

    const hash= await encrypt(password)
    const signeduser=await User.create({"email":email,"password":hash,"username":username})
    const token=await tokenize(signeduser._id)

    res.status(200).json({"username":username,"token":token})
}
const getallusers=(req,res)=>{
    User.find({},(err,data)=>{
        if(err){
            res.send({success:false,err:err})
        }
        else{
            res.send({success:true,data:data})
        }
    })
}

module.exports={login,signup,getallusers}