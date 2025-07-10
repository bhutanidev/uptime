import {Router} from "express"
import { authenticated, logoutController, signinController, signupController } from "../controller/auth.controller"
import { attachUserId } from "../middleware/auth.middleware"


const authRouter = Router()

authRouter.get("/health" , (req,res)=>{
    res.status(200).send("Hi from api")
    return
})
authRouter.get("/auth" , attachUserId , authenticated)
authRouter.post("/signin" , signinController)
authRouter.post("/signup" , signupController)
authRouter.post("/logout" , logoutController)

export default authRouter