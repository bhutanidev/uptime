import {Router} from "express"
import { attachUserId } from "../middleware/auth.middleware"
import { addNewWebsite, getStatusController } from "../controller/web.controller"



const webRouter = Router()

webRouter.post("/website",attachUserId,addNewWebsite)
webRouter.get("/status/:website" , attachUserId,getStatusController)

export default webRouter