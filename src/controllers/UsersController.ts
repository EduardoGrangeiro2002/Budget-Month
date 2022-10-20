import { Request, Response } from "express";
import { UsersService } from "../Services/UsersServices";

export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body

            const result = await this.usersService.create({ name, email, password })

            return res.json({msg: 'Usuário criado com sucesso', id: result})
        } catch (e) {
            throw e
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const { id_user, name, email, password } = req.body
            const result = await this.usersService.updateById({id_user, name, email, password})

            return res.json({msg: 'Usuário alterado com sucesso', id: result})
        } catch (e) {
            throw e
        }
    }

    async listById(req: Request, res: Response): Promise<Response> {
        try {
            const { id_user } = req.params
            const result = await this.usersService.listById(parseInt(id_user))

            return res.json({result})
        } catch (e) {
            throw e
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const { conditions } = req.body
            const result = await this.usersService.listAll(conditions)

            return res.json({result})
        } catch (e) {
            throw e
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const { id_user } = req.params
            const result = await this.usersService.deleteById(parseInt(id_user))

            return res.json({msg: 'Usuário apagado com sucesso', id: result})
        } catch (e) {
            throw e
        }
    }
}