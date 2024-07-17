import config from "../importenv/config"
import {Client, Account, ID, Avatars, OAuthProvider } from "appwrite"

export class authservice{
    client = new Client()
    account
    avatars
constructor(){
    this.client
    .setEndpoint(config.appwriteurl)
    .setProject(config.progectid);
    this.account = new Account(this.client)
    this.avatars = new Avatars(this.client)
}

async createaccount({email, password, name}){
    let useracc = await this.account.create(ID.unique(), email, password, name)
    if (useracc) {
       return await this.login(email,password)
    } else {
        return useracc
    }
}

async login(email,password){
   return await this.account.createEmailPasswordSession(email,password)
}

async getcurrentacc(){
   return await this.account.get()
}

async logout(){
    return await this.account.deleteSession("current")
}
async logoutforall(){
    return await this.account.deleteSessions()
}
async Listsessions(){
    return await this.account.listSessions()
}

async getlogo(name){
    return await this.avatars.getInitials(name)
}

async createphone(number){
    return await this.account.createPhoneToken(ID.unique(), number)
} 

async otpphone({phoneid,code}){
    return await this.account.updatePhoneSession(phoneid, code)
}

async updatename(name){
    return await this.account.updateName(name)
}

async emailvarify(url){
    return await this.account.createVerification(url)
}

async emailsecret({id, secret}){
    return await this.account.updateVerification(id, secret)
}

async deletaccount (id){
    return await this.account.deleteIdentity(id)
}

async createRepassword (email, url){
    return await this.account.createRecovery(email, url)
}

async confumcreateRepassword(userid, secret, newpass, conpass){
    return await this.account.updateRecovery(userid, secret, newpass, conpass)
}

async updateemail(email, passkey){
    return await this.account.updateEmail(email, passkey)
}

//Configure OAuth2 logins

async oauthgithub(){
return await this.account.createOAuth2Session( OAuthProvider.Github,"https://darkpassword.vercel.app","https://darkpassword.vercel.app/error")
}
async oauthgoogle(){
return await this.account.createOAuth2Session( OAuthProvider.Google,"https://darkpassword.vercel.app","https://darkpassword.vercel.app/error")
}

async getSession(){
    return await this.account.getSession("current")
}

}



const Auth = new authservice()

export default Auth