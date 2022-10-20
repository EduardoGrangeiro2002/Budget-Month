import { hash } from "bcrypt"
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

    public async create({name, email, password}: payloadCreate): Promise<number> {
        const user =  new User(name, email, password)
        
        if(!user.validateEmail()) throw new Error("Email em formato inválido!")

        if(!user.validatePassword()) throw new Error("Senha em formato inválido!")

        const [findUserByEmail, passwordHash] = await Promise.all([
             this.usersRepositories.selectByEmail(email),
             hash(password, SALT_ROUNDS)
        ])
         
        if(findUserByEmail) throw new Error("Email já cadastrado!")
        
        const insertId = await this.usersRepositories.create({name, email, password: passwordHash})

        return insertId
    }

    public async updateById({ id_user, name, email, password}: payload): Promise<number> {
        const findUserById = await this.usersRepositories.selectById(id_user)

        if(!findUserById) throw new Error("Usuário não cadastrado")

        const user = new User(name, email, password)

        if(!user.validateEmail()) throw new Error("Email em formato inválido!")

        if(!user.validatePassword()) throw new Error("Senha em formato inválido!")

        if(!user.compareEmail(findUserById.email)) {
            const findUserByEmail = await this.usersRepositories.selectByEmail(email)

            if(findUserByEmail) throw new Error("Email já cadastrado!")
        }

        const passwordHash = await hash(password, SALT_ROUNDS)

        const insertId = await this.usersRepositories.update({email, id_user, name, password: passwordHash})

        return insertId
    }

    public async listById(id_user: number): Promise<UserToDTO>{
        const findUserById = await this.usersRepositories.selectById(id_user)

        if(!findUserById) throw new Error("Usuário não cadastrado")

        const user = new User(findUserById.name, findUserById.email, findUserById.password)

        return user.returnDTO(id_user)
    }

    public async listAll(conditions?: conditions): Promise<UserToDTO[]> {
        const users = await this.usersRepositories.selectAll(conditions)

        const listUsersToDTO = listUsersDTO(users)

        return listUsersToDTO
    }

    public async deleteById(id_user: number): Promise<number> {
        const user = await this.usersRepositories.selectById(id_user)

        if(!user) throw new Error("Usuário não cadastrado!")

        const deletedId = await this.usersRepositories.delete(id_user)

        return deletedId
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