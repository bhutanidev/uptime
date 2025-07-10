import prisma from "db/client";
import ApiError from "utils/ApiError";
import ApiResponse from "utils/ApiResponse";
import asyncHandler from "utils/AsyncHandler";

export const getWebsiteController = asyncHandler(async(req,res,next)=>{
    const id = req.userId
    try {
        const websites = await prisma.website.findMany({
            where:{
                user_id:id
            },
            include:{
                website_tick:{
                    orderBy:{
                        createdAt:'desc'
                    },
                    select:{
                        status:true,
                        response_time_in_ms:true,
                        createdAt:true
                    },
                    take:1
                },
            }
        })
        console.log(websites)
        const currentTime = new Date(Date.now())
        const response = websites.map((website)=>{
            return{
                id:website.id,
                url:website.url,
                status:website?.website_tick?.[0]?.status || "unknown",
                response_time_in_ms:website?.website_tick?.[0]?.response_time_in_ms || 0,
                createdAt : website?.website_tick?.[0]?.createdAt || 0
            }
        })
        res.send(new ApiResponse(200,{websites:response},"Fetch successfull"))
    } catch (error) {
        next(new ApiError(500,"Internal db error"))
    }
})

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

export const recentStatusController = asyncHandler(async(req,res,next)=>{
    const userId  = req.userId
    const websiteId = req.params.websiteId as string
    const limit = parseInt(req.query.limit as string) || 10
    const page = parseInt(req.query.page as string) || 1

    if(!websiteId){
        next(new ApiError(400,"Website id not found"))
        return
    }
    const skip = (page -1)*10

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
        const websites = await prisma.websiteTick.findMany({
            where:{
                website_id:websiteId
            },
            orderBy:{
                createdAt:'desc'
            },
            select:{
                createdAt:true,
                status:true,
                response_time_in_ms:true
            },
            skip:skip,
            take:limit
        })
        console.log(websites)
        console.log(found);
        
        res.json(new ApiResponse(200,{id:found?.id,url:found?.url,status:found?.website_tick?.[0]?.status,response_time_in_ms:found?.website_tick?.[0]?.response_time_in_ms , lastChecked:found?.website_tick?.[0]?.createdAt ,websites},"Fetch successfull"))
    } catch (error) {
        next(new ApiError(500,"Id not valid"))
    }
})