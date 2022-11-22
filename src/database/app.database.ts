import mongoose from "mongoose"
import { config } from "../configs/database.config"

export const database = {
    async connect() {
        try { await mongoose.connect(config.uri) }
        catch(e: any) { throw new Error(e.message) }
    }
}
export default database