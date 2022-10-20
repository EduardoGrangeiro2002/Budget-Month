import { UsersController } from "../controllers";
import { UsersRepository } from "../repositories/implemantation/UsersRepository";
import { UsersService } from "../Services/UsersServices";



function makeFactoryUsers(): UsersController {
    const usersRepositories = new UsersRepository()
    const usersService = new UsersService(usersRepositories)
    const userControllers = new UsersController(usersService)

    return userControllers
}

export { makeFactoryUsers }