export type UserToDTO = {
    id_user: number,
    name: string
    email: string
}

class User {
    public readonly name: string
    public readonly email: string
    private readonly password: string
    private readonly active: number | undefined
    constructor(name: string, email: string, password: string, active?: number) {
        this.name = name
        this.email = email
        this.password = password
        this.active = active
    }
    
    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    validatePassword(): boolean {
        const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)

        return regex.test(this.password)
    }

    validateEmail(): boolean {
        const regex = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i)

        return regex.test(this.email)
    }

    compareEmail(email: string): boolean {
        return this.email === email
    }

    validateActive(): boolean {
        return this.active == 1
    }

    returnDTO(id_user: number): UserToDTO {
        return {
            id_user: id_user,
            name: this.name,
            email: this.email
        }
    }
}

export { User }