import { hash } from "bcrypt"
import { AppError } from "../configs/errors/AppError"
import { AppMessages, responseService } from "../configs/Messages/AppMessages"
import { User, UserToDTO } from "../entities/User"
import { IUsersRepository } from "../repositories/interfaces/IUsersRepository"

type payload = {
    id_user: number
    name: string
    email: string
    password: string
}

type payloadCreate = Omit<payload, 'id_user'>

type conditions = {
    conditions: {
        column: string,
        value: string,
        andOr: string,
        operator: string
    }
}

type UsersPrisma = {
    name: string, 
    email: string, 
    password: string, 
    id_user: number
}
const SALT_ROUNDS = 8

class UsersService {
    constructor (
        private usersRepositories: IUsersRepository,
    ) {}

    public async create({name, email, password}: payloadCreate): Promise<responseService> {

        AppError.existsError(email, AppMessages.findMessage('ERR006'))
        AppError.existsError(password, AppMessages.findMessage('ERR007'))
        AppError.existsError(name, AppMessages.findMessage('ERR008'))

        const user =  new User(name, email, password)

        if(!user.validateEmail()) throw new AppError(AppMessages.findMessage('ERR004'))

        if(!user.validatePassword()) throw new AppError(AppMessages.findMessage('ERR003'))

        const [findUserByEmail, passwordHash] = await Promise.all([
             this.usersRepositories.selectByEmail(email),
             hash(password, SALT_ROUNDS)
        ])
         
        if(findUserByEmail) {
            throw new AppError(AppMessages.findMessage('ERR005'))
        }
        
        const insertId = await this.usersRepositories.create({name, email, password: passwordHash})

        const msg = AppMessages.findMessage('MSG001')

        return AppMessages.sendMessageService(msg, {id: insertId})
    }

    public async updateById({ id_user, name, email, password}: payload): Promise<responseService> {
        const findUserById = await this.usersRepositories.selectById(id_user)
        AppError.existsError(findUserById, AppMessages.findMessage('ERR001'))
        const lastEmail = findUserById?.email
        const user = new User(name, email, password)

        if(!user.validateEmail()) throw new AppError(AppMessages.findMessage('ERR004'))

        if(!user.validatePassword()) throw new AppError(AppMessages.findMessage('ERR003'))

        if(!user.compareEmail(lastEmail || '')) {
            const findUserByEmail = await this.usersRepositories.selectByEmail(email)

            if(findUserByEmail) throw new AppError(AppMessages.findMessage('ERR005'))
        }

        const passwordHash = await hash(password, SALT_ROUNDS)

        const insertId = await this.usersRepositories.update({email, id_user, name, password: passwordHash})

        const msg = AppMessages.findMessage('MSG002')

        return AppMessages.sendMessageService(msg, {id: insertId})
    }

    public async listById(id_user: number): Promise<UserToDTO>{
        const findUserById = await this.usersRepositories.selectById(id_user)

        if(!findUserById) throw new AppError(AppMessages.findMessage('ERR001'))

        const user = new User(findUserById.name, findUserById.email, findUserById.password)

        return user.returnDTO(id_user)
    }

    public async listAll(conditions?: conditions): Promise<UserToDTO[]> {
        const users = await this.usersRepositories.selectAll(conditions)

        const listUsersToDTO = listUsersDTO(users)

        return listUsersToDTO
    }

    public async deleteById(id_user: number): Promise<responseService> {
        const user = await this.usersRepositories.selectById(id_user)

        if(!user) throw new AppError(AppMessages.findMessage('ERR001'))

        const deletedId = await this.usersRepositories.delete(id_user)

        const msg = AppMessages.findMessage('MSG003')

        return AppMessages.sendMessageService(msg, {id: deletedId})
    }
}


function listUsersDTO (users: UsersPrisma[] | null): UserToDTO[] {
    if(users === null) return []
    const usersDTO: UserToDTO[] = []

    users.forEach( user => {
        usersDTO.push(new User(user.name, user.email, user.password).returnDTO(user.id_user))
    })

    return usersDTO
}

export { UsersService }