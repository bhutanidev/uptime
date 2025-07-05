import prisma from "db/client";
import ApiError from "utils/ApiError";
import ApiResponse from "utils/ApiResponse";
import asyncHandler from "utils/AsyncHandler";

export const addNewWebsite = asyncHandler(async(req,res,next)=>{
    const id = req.userId
    const {url} = req.body
    try {
        const found = await prisma.website.findFirst({
            where:{
                url:url,
                user_id:id
            }
        })
        if(found){
            next(new ApiError(400,"Website already exists in your monitor"))
            return
        }
        const newentry =  await prisma.website.create({
            data:{
                url,
                user_id:id
            }
        })
        res.json(new ApiResponse(200,{id:newentry.id , url:newentry.url} ,"Website added for monitoring"))
    } catch (error) {
        console.log(error)
        next(new ApiError(500,"Internal database error"))
    }
})

export const getStatusController = asyncHandler(async(req,res,next)=>{
    const userId  = req.userId
    const websiteId = req.params.websiteId
    if(!websiteId){
        next(new ApiError(500,"Website id not found"))
        return
    }
    try {
        const found = await prisma.website.findFirst({
            where:{
                id:websiteId,
                user_id:userId
            },
            include:{
                website_tick:{
                    orderBy:[{
                        createdAt: 'desc'
                    }],
                    take:1
                }
            }
        })
        if(!found){
            next(new ApiError(409,"Website not found"));
        }
        res.json(new ApiResponse(200,{...found},"Status Fetched"))
    } catch (error) {
        
    }
}) 