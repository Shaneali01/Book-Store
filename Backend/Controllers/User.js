const { CreateToken } = require("../Auth");
const { usermodel } = require("../Models/usermodel");
const bcrypt=require('bcryptjs')

async function Signup(req,res){
    try{
        const {name,email,password}=req.body;
        const data=await usermodel.findOne({email});
        if(data){
            return res.json({message:"EMAIL ALREADY EXISTS"})
        }
        const hashpassword= await bcrypt.hash(password,8)
        const userdata=new usermodel({
            name,
            email,
            password:hashpassword
        })
        await userdata.save();
        const token= await CreateToken(userdata,res);

        return res.json({message:'SUCESSFULLY CREATED USER',token})

    }
    catch(error){
        console.log(error)
        return res.json({message:"SOMETHING WENT WRONG"})
    }
}
async function Login(req,res){
    try{
        const {email,password}=req.body;
        const User=await usermodel.findOne({email});
        if(!User){
            return res.json({message:"USER DONT EXIST WITH THIS EMAIL"})
        }
        const Match = await bcrypt.compare(password,User.password);
        if(!Match){
            return res.json({message:"WRONG PASSWORD"})
        }
        const token= await CreateToken(User,res);
        return res.json({message:"SUCCESSFULL LOGIN",token})


    }
    catch(error){
        console.log(error);
        return res.json("SOMETHING WENT WRONG")
    }
}
module.exports={Signup,Login}