import axios from "axios";
import { sleep } from "bun";
import prisma from "db/client";
import { getGroup, initRegion, sendBulkAck } from "reddisstream/stream";


const region = process.env.REGION_ID!
const main = async()=>{
    if(!region){
        console.log("Region not provided");
        return
    }
    initRegion(region)
    while(1){
        try {
            const res = await getGroup(region , "machine-1")
            if(!res)continue
            // console.log(res)
            let promises  = res.map((streamEntries)=>generatePromise(streamEntries.website_id , streamEntries.url))
            console.log(promises.length);
            await Promise.all(promises)
            await sendBulkAck(region , res.map(e=>e.id))
        } catch (error) {
            // console.log("worker: no streams present ")
        }
    }
}
const generatePromise = async(website_id : any , url : any)=>{
    return new Promise<void>((resolve,reject)=>{
        const starttime : Date = new Date(Date.now())
        const st = Date.now()
        axios.get(url)
        .then(async()=>{
            await prisma.websiteTick.create({
                data:{
                    createdAt:starttime,
                    response_time_in_ms: Date.now()-st,
                    status:"up",
                    region_id:region,
                    website_id:website_id
                }
            })
            console.log(`url: ${url} is up`);
            
            resolve()
        })
        .catch(async(e)=>{
            // console.log(e)
            await prisma.websiteTick.create({
                data:{
                    createdAt:starttime,
                    response_time_in_ms: st-Date.now(),
                    status:"down",
                    region_id:region,
                    website_id:website_id
                }
            })
            console.log(`url: ${url} is down`);
            resolve()

        })
    })
}
    
main()