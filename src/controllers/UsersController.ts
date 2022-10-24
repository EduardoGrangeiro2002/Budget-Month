import { Request, Response } from "express";
import { AppError } from "../configs/errors/AppError";
import { AppMessages } from "../configs/Messages/AppMessages";
import { UsersService } from "../Services/UsersServices";

export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body

            const result = await this.usersService.create({ name, email, password })

            return res.json(result)
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json(e.message)
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json(error.message)
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const { id_user, name, email, password } = req.body
            const result = await this.usersService.updateById({id_user, name, email, password})

            return res.json(result)
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json(e.message)
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json(error.message)
        }
    }

    async listById(req: Request, res: Response): Promise<Response> {
        try {
            const { id_user } = req.params
            const result = await this.usersService.listById(parseInt(id_user))

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json(e.message)
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json(error.message)
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const { conditions } = req.body
            const result = await this.usersService.listAll(conditions)

            return res.json({result})
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json(e.message)
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json(error.message)
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { id_user } = req.params
            const result = await this.usersService.deleteById(parseInt(id_user))

            return res.json(result)
        } catch (e: any) {
            if(e.message && e.statusCode) return res.status(e.statusCode).json(e.message)
            
            const error = new AppError(AppMessages.findMessage('ERR009'))

            return res.status(error.statusCode).json(error.message)
        }
    }
}