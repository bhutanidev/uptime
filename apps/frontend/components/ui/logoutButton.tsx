"use client"
import { LogOut } from "lucide-react"
import { Button } from "./button"
import { api } from "@/lib/utils"
import { useRouter } from "next/navigation"

const Logout = ()=>{
    const router = useRouter()
    const handleLogout = async()=>{
        try {
            const res = await api.post("/api/logout")
            router.push("/signin")
        } catch (error) {
            console.log(error)
        }
    }
    return(                
    <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:cursor-pointer" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2 text-black" />
        <span className=' text-black'>Logout</span>
    </Button>)
}

export default Logout