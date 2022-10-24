
export type error = {
    statusCode: number,
    message: string
}

export class AppError { 
    public readonly message: string
    public readonly statusCode: number
    constructor({message, statusCode = 400}: error) {
        this.message = message
        this.statusCode = statusCode
    }

    public static existsError(obj: any, {message, statusCode}: error): void{
        if(!obj || obj === null || obj === undefined || obj.length === 0 || Object.keys(obj).length === 0) {
            throw {
                message: message,
                statusCode: statusCode
            }
        }
    }
}