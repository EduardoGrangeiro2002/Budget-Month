import { User } from "../../../entities/User"
import { UserAttributes } from "../types"


let user: UserAttributes

describe("Test User class" , () => {
    beforeEach( () => {
        user = {
            name: 'Nome de teste',
            email: 'emailteste@email.com',
            password: 'Senha1Fort&',
            active: 1
        }
    })

    test('Should to create a new User class', () => {
        const userClass: User = new User(user.name, user.email, user.password, user.active)
        expect(userClass).toHaveProperty("name")
        expect(userClass).toHaveProperty("email")
        expect(userClass).toHaveProperty("password")
        expect(userClass).toHaveProperty("active")

        expect(userClass).toHaveProperty("validateActive")
        expect(userClass).toHaveProperty("returnDTO")
        expect(userClass).toHaveProperty("getEmail")
        expect(userClass).toHaveProperty("getName")
        expect(userClass).toHaveProperty("compareEmail")
        expect(userClass).toHaveProperty("validateEmail")
        expect(userClass).toHaveProperty("validatePassword")
        expect(userClass).toHaveProperty("getName")
    })

    describe("Test Methods in User class", () => {

        test("Method: validateActive should be able return a boolean true for active = 1", () => {
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.validateActive()).toBe(true)
        })

        test("Method: validateActive should be able return a boolean false for active = 0", () => {
            user.active = 0
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.validateActive()).toBe(false)
        })

        test("Method: validatePassword should be able return boolean true for strength password", () => {
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.validatePassword()).toBe(true)
        })

        test("Method: validatePassword should be able return boolean false for weak password", () => {
            user.password = '123456'
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.validatePassword()).toBe(false)
        })

        test("Method: validateEmail should be able return boolean true for valid email", () => {
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.validateEmail()).toBe(false)
        })

        test("Method: validateEmail should be able return boolean false for invalid email", () => {
            user.email = 'test.com'
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.validateEmail()).toBe(false)
        })

        test("Method: getEmail should be able return the email of my class", () => {
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.getEmail()).toEqual(userClass.email)
        })

        test("Method: getName should be able return the name of my class", () => {
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.getName()).toEqual(userClass.name)
        })

        test("Method: compareEmail it should be able to compare if the email of my class  is the same as the one passed in method", () => {
            const email = 'emailteste@email.com'
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.compareEmail(email)).toBe(true)
        })

        test("Method: compareEmail it should be able to compare if the email of my class  is the differe as the one passed in method", () => {
            const email = 'email@email.com'
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.compareEmail(email)).toBe(false)
        })

        test("Method: returnDTO it should be able to necessary return the user properties", () => {
            const id_user = 1
            const userClass: User = new User(user.name, user.email, user.password, user.active)
            expect(userClass.returnDTO(id_user)).toHaveProperty("id_user")
            expect(userClass.returnDTO(id_user)).toHaveProperty("name")
            expect(userClass.returnDTO(id_user)).toHaveProperty("email")
        })
    })
})