import express, { urlencoded } from "express"
import authRouter from "./routes/auth.route"
import errorHandler from "utils/ErrorHandler"
import webRouter from "./routes/website.route"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api", authRouter)
app.use("/api", webRouter)


app.use(errorHandler)
app.listen(3001,()=>{
    console.log("Api running on port 3001")
})

