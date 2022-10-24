export type User = {
    id_user: number
    name: string
    email: string
    password: string
}

export type conditions = {
    conditions: {
        column: string,
        value: string,
        andOr: string,
        operator: string
    }
}

export namespace inputs {
    export type create = {
        name: string
        email: string
        password: string
    }

    export type update = {
        id_user: number
        name: string
        email: string
        password: string
    }
}

export interface IUsersRepository {
     create(User: inputs.create): Promise<number>

     update(User: inputs.update): Promise<number>

     selectAll(conditions?: conditions): Promise<User[] | null>

     selectByEmail(email:string): Promise<User | null>

     selectById(id_user: number): Promise<User | null>

     delete(id_user: number): Promise<number>

     register(id_user: number): Promise<number>
}