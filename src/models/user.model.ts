import * as mongoose from "mongoose"
import * as jwt from "jsonwebtoken"
import * as argon from "argon2"
import { config } from "../configs/jwt.config"
import { randomBytes } from "crypto"

interface IUser {
    login: string,
    password: string,
    googleId: string,
    vkontakteId: number
}
interface IUserDocument extends IUser, mongoose.Document {
    verifyPassword(password: string): Promise<boolean>
    createTokens(): { access: string, refresh: string }
}
interface IUserModel extends mongoose.Model<IUserDocument> {
    findByLogin(login: string): Promise<IUserDocument>
    findByGoogleId(id: string): Promise<IUserDocument>
    findByGoogleIdOrCreate(id: string): Promise<IUserDocument>
    findByVkontakteId(id: number): Promise<IUserDocument>
    findByVkontakteIdOrCreate(id: number): Promise<IUserDocument>
}

const schema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
    login: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        default: null
    },
    googleId: {
        type: mongoose.Schema.Types.String,
        default: null
    },
    vkontakteId: {
        type: mongoose.Schema.Types.Number,
        default: null
    }
})

schema.pre("save", async function (this: IUserDocument, next) {
    if(this.password) {
        this.password = await argon.hash(this.password); next();
    }
    else next()
})
schema.methods.verifyPassword = async function(this: IUserDocument, password: string): Promise<boolean> {
    return await argon.verify(this.password, password)
}
schema.methods.createTokens = function(this: IUserDocument): { access: string, refresh: string } {
    return {
        access: jwt.sign({ id: this.id, login: this.login }, config.secret, { expiresIn: config.expires.access }),
        refresh: jwt.sign({ id: this.id }, config.secret, { expiresIn: config.expires.refresh })
    }
}
schema.statics.findByLogin = async function(login: string): Promise<IUserDocument> {
    return await this.findOne({ login })
}
schema.statics.findByGoogleId = async function(id: string): Promise<IUserDocument> {
    return await this.findOne({ googleId: id })
}
schema.statics.findByGoogleIdOrCreate = async function(id: string): Promise<IUserDocument> {
    const user = await this.findOne({ googleId: id })

    if(user) return user
    else return await this.create({ login: randomBytes(20).toString("hex"), googleId: id })
}
schema.statics.findByVkontakteId = async function(id: number): Promise<IUserDocument> {
    return await this.findOne({ vkontakteId: id })
}
schema.statics.findByVkontakteIdOrCreate = async function(id: number): Promise<IUserDocument> {
    const user = await this.findOne({ vkontakteId: id })

    if(user) return user
    else return await this.create({ login: randomBytes(20).toString("hex"), vkontakteId: id })
}

export const User = mongoose.model<IUserDocument, IUserModel>("users", schema)
export default User