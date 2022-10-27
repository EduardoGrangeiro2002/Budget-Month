import { UsersController } from "../controllers";
import { DayjsDateProvider } from "../providers/implemantation/DayJSDateProvider";
import { UsersRepository } from "../repositories/implemantation/UsersRepository";
import { UsersTokensRepository } from "../repositories/implemantation/UsersTokensRepository";
import { UsersService } from "../Services/UsersServices";



function makeFactoryUsers(): UsersController {
    const usersRepositories = new UsersRepository()
    const dayjsDateProvider = new DayjsDateProvider()
    const userTokensRepository = new UsersTokensRepository()
    const usersService = new UsersService(usersRepositories, dayjsDateProvider, userTokensRepository)
    const userControllers = new UsersController(usersService)

    return userControllers
}

export { makeFactoryUsers }