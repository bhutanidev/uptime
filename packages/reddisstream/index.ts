import { createClient } from 'redis';

const client = createClient();
const stream = "uptime:website"
const init = async()=>{
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
}
export const initRegion=async(region:string)=>{
    try {
        const res18 = await client.xGroupCreate(stream, region, '$');
    } catch (error) {
        console.log(error);
    }
}
init()
export const addEntry = async(website_id:string , url:string)=>{
    
    try {
        const res1 = await client.xAdd(
        stream, '*', {
            "id":website_id,
            "url":url
        })
        return res1
    } catch (error) {
        console.log(error)
    }
}
export const getGroup = async(region:string,workerName : string|undefined)=>{
    // console.log(stream)

    workerName = workerName || ""
    const res20 = await client.xReadGroup(
    region,
    workerName, {
        key: stream,
        id: '>'
    }, {
        'COUNT': 5
    })
    // console.log("fetched website: " , res20)
    if(!res20){
        return undefined
    }
    // @ts-ignore
    const res = res20[0]?.messages as any[]
    const response = res.map((website)=>{
        return{
            id:website.id,
            website_id:website.message.id,
            url:website.message.url
        }
    })
    return response
}

export const sendAck = async(region:string,redis_id : string)=>{

    try {
        const res  = await client.xAck(stream, region, redis_id)
        console.log("Acknowledged: " , res, " " , redis_id );
    } catch (error) {
        console.log(error);
        
    }

}

export async function sendBulkAck(consumerGroup: string, eventIds: string[]) {
    eventIds.map(eventId => sendAck(consumerGroup, eventId));
}