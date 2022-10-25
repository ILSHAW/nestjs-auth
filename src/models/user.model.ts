import * as mongoose from "mongoose"
import * as jwt from "jsonwebtoken"
import * as argon from "argon2"
import { jwtConfig } from "../configs/jwt.config"

interface IUser {
    login: string,
    password: string,
}
interface IUserDocument extends IUser, mongoose.Document {
    verifyPassword(password: string): Promise<boolean>
    createTokens(): { access: string, refresh: string }
}
interface IUserModel extends mongoose.Model<IUserDocument> {
    findByLogin(login: string): Promise<IUserDocument>
}

const schema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
    login: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    }
})

schema.pre("save", async function (this: IUserDocument, next) {
    this.password = await argon.hash(this.password); next();
})
schema.methods.verifyPassword = function(this: IUserDocument, password: string): Promise<boolean> {
    return argon.verify(this.password, password)
}
schema.methods.createTokens = function(this: IUserDocument): { access: string, refresh: string } {
    return {
        access: jwt.sign({ _id: this._id, login: this.login }, jwtConfig.secret, { expiresIn: jwtConfig.accessExpires }),
        refresh: jwt.sign({ _id: this._id }, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpires })
    }
}
schema.statics.findByLogin = function(login: string): Promise<IUserDocument> {
    return this.findOne({ login })
}

export const User = mongoose.model<IUserDocument, IUserModel>("users", schema)