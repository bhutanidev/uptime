import prisma from "db/client"
import ApiError from "utils/ApiError"
import ApiResponse from "utils/ApiResponse"
import asyncHandler from "utils/AsyncHandler"
import { comparePassword, hashPassword } from "../helper/encrypt"
import jwt from "jsonwebtoken"
export const signupController=asyncHandler(async(req,res,next)=>{
    const {password, email , name} = req.body
    try {
        const hashedpw = await hashPassword(password)
        const newentry = await prisma.user.create({
            data:{
                password:hashedpw, email , name
            }
        })
        if(!newentry){
            next(new ApiError(500,"Database error"))
            return
        }
        res.status(200).json(new ApiResponse(200,{email:newentry.email,name:newentry.name},"User created succsessfully"))
    } catch (error) {
        console.log(error);   
        next(new ApiError(400,"Email already exists"))
        return;
    }
})

export const signinController=asyncHandler(async(req,res,next)=>{
    const { password, email } = req.body

    const JWT_SECRET = process.env.JWT_SECRET!
    
    const found = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!found){
        next(new ApiError(400,"Email does not exist"))
        return;
    }
    const match = await comparePassword(password,found.password)
    if(!match){
        next(new ApiError(400,"Incorrect Password"))
        return
    }
    const token = jwt.sign({id:found.id,email:found.email,name:found.name},JWT_SECRET)
    res.cookie("token",token,{httpOnly:true}).status(200).json(new ApiResponse(200,{id:found.id,token,email:found.email,name:found.name},"User logged in"))
})