import { createClient } from 'redis';

const client = createClient();
const stream = process.env.STREAM!
const init = async()=>{
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
}
init()
export const addEntry = async(website_id:string , url:string)=>{
    try {
        const res1 = await client.xAdd(
        stream, '*', {
            "id":website_id,
            "url":url
        })
        console.log(res1)
    } catch (error) {
        console.log(error)
    }
}
export const getGroup = async(region:string,workerName : string|undefined)=>{
    try {
        const res18 = await client.xGroupCreate(stream, region, '$');
    } catch (error) {
        console.log(error);
    }
    workerName = workerName || ""
    const res20 = await client.xReadGroup(
    region,
    workerName, {
        key: stream,
        id: '>'
    }, {
        'COUNT': 5
    })
    console.log("fetched website: " , res20)
    // @ts-ignore
    const response : {url:string , id:string} = {url: res20[0].messages[0].message.url ,id: res20[0].messages[0].message.id}
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