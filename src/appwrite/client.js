import { Databases, Client, ID, Query } from "appwrite";
import config from "../importenv/config";

class clientclass{
    user
    client = new Client()
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl)
        .setProject(config.progectid);

        this.user = new Databases(this.client)
    }

    async createclient(userid){
        return await this.user.createDocument(config.databaseid, config.clientid, ID.unique(), {userid:userid})
    }

    async updateclient(id,{data, code}){
        return await this.user.updateDocument(config.databaseid, config.clientid, id, {geminiapi:data, code:code})
    }

    async deleteuser(id){
        return await this.user.deleteDocument(config.databaseid, config.clientid, id)
    }

    async getclient(id){
        return await this.user.getDocument(config.databaseid, config.clientid, id)
    }

    async getclientbyuserid(id){
        return await this.user.listDocuments(config.databaseid, config.clientid, [Query.equal("userid", id)])
    }
}

const Clientbase = new clientclass()
export default Clientbase