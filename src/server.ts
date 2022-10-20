import { App } from "./app";

class Server {
    static start ():void {
        const app = new App(3000)
        app.init()
        app.start()
    }
}

Server.start()