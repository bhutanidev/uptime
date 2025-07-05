import { getGroup } from "reddisstream/stream";

const main = async()=>{
    const region = process.env.REGION
    if(!region){
        console.log("Region not provided");
        return
    }
    try {
        const res = await getGroup(region , "machine-1")
        console.log(res)
    } catch (error) {
        console.log("worker: ",error);
    }
}

main()