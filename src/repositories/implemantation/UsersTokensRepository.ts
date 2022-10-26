import { PrismaClient } from "@prisma/client";
import { IUsersTokensRepository } from "../interfaces";
import { ICreateUserTokensDTO, UsersTokens } from "../interfaces/IUsersTokensRepository";



export class UsersTokensRepository implements IUsersTokensRepository {
    private userTokensClient: PrismaClient
    constructor() {
        this.userTokensClient = new PrismaClient()
    }
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens> {
        const token = await this.userTokensClient.userToken.create({data: {id_user: user_id, expires_date, refresh_token}, 
            select: {id_user: true, id_user_token: true, expires_date: true, refresh_token: true}})

        return token
    }
    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersTokens> {
        throw new Error("Method not implemented.");
    }
    async deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findByRefreshToken(token: string): Promise<UsersTokens> {
        throw new Error("Method not implemented.");
    }
}