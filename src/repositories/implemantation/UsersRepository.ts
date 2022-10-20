import { prisma, PrismaClient } from "@prisma/client";
import { conditions, inputs, IUsersRepository, User } from "../interfaces/IUsersRepository";



export class UsersRepository implements IUsersRepository {
    private userClient: PrismaClient
    constructor() {
        this.userClient = new PrismaClient()
    }
    async create(User: inputs.create): Promise<number> {
        const { name, email, password } = User
        const user = await this.userClient.user.create({data: {name, email, password}, select: {id_user: true}})

        return user.id_user
    }
    async update(User: inputs.update): Promise<number> {
        const { id_user, email, name, password } = User

        const user = await this.userClient.user.update({where: {id_user}, data: {email, name, password, updatedAt: new Date()}, select: {id_user: true}})

        return user.id_user

    }
    async selectAll(conditions: conditions): Promise<User[] | null> {
        const users = await this.userClient.user.findMany({select: {id_user: true, name: true, email: true, password: true}})
        
        return users
    }
    async selectByEmail(email: string): Promise<User | null> {
        const user = await this.userClient.user.findUnique({where: {email: email}, select: {email: true, name: true, id_user: true, password: true}})

        return user
    }
    async selectById(id_user: number): Promise<User | null> {
        const user = await this.userClient.user.findUnique({where: {id_user}, select: {email: true, name: true, id_user: true, password: true}})

        return user
    }
    async delete(id_user: number): Promise<number> {
        const user = await this.userClient.user.delete({where: {id_user}, select: {id_user: true}})

        return user.id_user
    }
  
}