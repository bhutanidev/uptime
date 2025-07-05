import prisma from "db/client";
import { addEntry } from "reddisstream/stream";


// const main = async()=>{
//     try {
//         const newEntry  = await addEntry("google.com","1")
//         console.log(newEntry)
//     } catch (error) {
//         console.log(error)
//     }
// }
const main = async() => {
    const allWebsites = await prisma.website.findMany({
        select:{
            id:true,
            url:true
        }
    })
    allWebsites.forEach(async(website_record) => {
        const {url , id} = website_record
        if(!url || !id){
            return
        }
        const newEntry  = await addEntry(id,url)
        console.log(newEntry)
    });
}
setInterval(() => {
    main()
}, 10*1000);
main()
