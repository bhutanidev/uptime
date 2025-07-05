import {Router} from "express"
import { signinController, signupController } from "../controller/auth.controller"


const authRouter = Router()

authRouter.get("/health" , (req,res)=>{
    res.status(200).send("Hi from api")
    return
})
authRouter.post("/signin" , signinController)
authRouter.post("/signup" , signupController)


export default authRouter