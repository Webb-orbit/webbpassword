const config = {
    progectid: String(import.meta.env.VITE_PROJECT_ID),
    appwriteurl: String(import.meta.env.VITE_PROJECT_URL),
    databaseid: String(import.meta.env.VITE_DATABASE_ID),
    collectionid: String(import.meta.env.VITE_COLLECTION_ID),
    ultracollid: String(import.meta.env.VITE_ULTRACOLL_ID),
    sharedid: String(import.meta.env.VITE_SHAREED_ID),
    clientid: String(import.meta.env.VITE_CLIENT_ID),
}

export default config