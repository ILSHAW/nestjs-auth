import * as mongoose from "mongoose"
import { databaseConfig } from "../configs/database.config"

export const databaseConnect = async () => {
    try {
        await mongoose.connect(databaseConfig.uri)
        console.log("Database connected")
    }
    catch(e: any) {
        throw new Error(e.message)
    }
}