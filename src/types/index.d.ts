declare namespace Express {
    interface Request {
        user?: {
            id: string
            login: string
            password: string,
            googleId: string,
            vkontakteId: number
        }
    }
}