import { Router } from "express";
import userRouter from "./users.routes"

class Routes {
    static define(router: Router) {
        router.use('/users', userRouter)

        return router
    }
}

export default Routes.define(Router());
