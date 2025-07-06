import {Router} from "express"
import { attachUserId } from "../middleware/auth.middleware"
import { addNewWebsite, getStatusController, getWebsiteController, recentStatusController } from "../controller/web.controller"



const webRouter = Router()

webRouter.get("/website" , attachUserId,getWebsiteController)
webRouter.get("/website/:websiteId" , attachUserId,getStatusController)
webRouter.get("/website/status/:websiteId" , attachUserId,recentStatusController)
webRouter.post("/website",attachUserId,addNewWebsite)

export default webRouter