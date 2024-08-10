import config from "../importenv/config"
import {Client, Databases, ID, Query} from "appwrite"


export class dataservices{
    client = new Client()
    database
constructor(){
this.client
.setEndpoint(config.appwriteurl)
.setProject(config.progectid)

this.database = new Databases(this.client)
}

async createtodo({title,content, colluserid}){
    console.log('>>>>>>>>>>>',config.databaseid, config.collectionid)
    return await this.database.createDocument(config.databaseid, config.collectionid, ID.unique(), {title,content,colluserid})
}

async deletetodo(docid){
 let delet =  await this.database.deleteDocument(config.databaseid, config.collectionid, docid)
 if (delet) {
    return delet
 } else {
    return false
 }
}

async updatetodo(docid, {content, code, shared, geminiapi}){
    return await this.database.updateDocument(config.databaseid, config.collectionid, docid,  {content, code, shared,geminiapi})
}

async alltodos(quries){
    return await this.database.listDocuments(config.databaseid, config.collectionid, [Query.equal('colluserid', [quries])])
}

async alltodosbyshared(shared, value){
    return await this.database.listDocuments(config.databaseid, config.collectionid, [Query.equal("shared", [shared]), Query.equal('colluserid', [value])])
}

async gettodo(docid){
    return await this.database.getDocument(config.databaseid, config.collectionid, docid)
}

// sharedtodo

async createshare({sharedtodo, privated, user, views, autoupdate,linkedtodoid,creatorinfo}){
    return await this.database.createDocument(config.databaseid, config.sharedid, ID.unique(), {sharedtodo, privated, user, views, autoupdate, linkedtodoid, creatorinfo})
}

async deleteshare(docid){
 return await this.database.deleteDocument(config.databaseid, config.sharedid, docid)
}

async updateshare(docid, {sharedtodo, privated, user, views, autoupdate, linkedtodoid, creatorinfo}){
    return await this.database.updateDocument(config.databaseid, config.sharedid, docid,  {sharedtodo, privated, user, views, autoupdate, linkedtodoid, creatorinfo})
}

async sharesbyid(id){
    return await this.database.listDocuments(config.databaseid, config.sharedid, [Query.equal('user', [id])])
}
async shbylikedouserid(id, linkedid){
    return await this.database.listDocuments(config.databaseid, config.sharedid, [Query.equal('user', [id]),Query.equal('linkedtodoid', [linkedid])])
}

async getshare(id){
    return await this.database.getDocument(config.databaseid, config.sharedid, id)
}


}



const Dataserv = new dataservices()

export default Dataserv