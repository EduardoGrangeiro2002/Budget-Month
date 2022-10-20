import bodyParser from "body-parser"
import Express from "express"
import { Server } from "http"
import  router  from "./router/index"

export class App  {
    private server?: Server
    constructor(private port: number, public app = Express()) {}

    public init(): void {
        this.setupExpress()
        this.setRoutes()
    }
    
    private setRoutes(): void {
        this.app.use(router)
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => console.log(`Server is runnning at port: ${this.port}`))
    }
}