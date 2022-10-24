

type message = {
    cod: string,
    message: string,
    statusCode: number
}

export type responseService = 
    {
        message: string,
        params: any,
        statusCode: number
    }

export class AppMessages {
    private static getMessages (): message[] {
        return [
            {cod: 'MSG001', message: 'Usuário criado com sucesso!', statusCode: 201},
            {cod: 'MSG002', message: 'Usuário alterado com sucesso!', statusCode: 200},
            {cod: 'MSG003', message: 'Usuário apagado com sucesso!', statusCode: 200},
            {cod: 'ERR001', message: 'Usuário não encontrado!', statusCode: 404},
            {cod: 'ERR002', message: 'Email já cadastrado!', statusCode: 400},
            {cod: 'ERR003', message: 'Senha inválida!', statusCode: 400},
            {cod: 'ERR004', message: 'Email inválido!', statusCode: 400},
            {cod: 'ERR005', message: 'Email já registrado!', statusCode: 400},
            {cod: 'ERR006', message: 'Email é um campo obrigatório!', statusCode: 400},
            {cod: 'ERR007', message: 'Senha é um campo obrigatório!', statusCode: 400},
            {cod: 'ERR008', message: 'Nome é um campo obrigatório!', statusCode: 400},
            {cod: 'ERR009', message: 'Erro interno no servidor!', statusCode: 500},

        ]
    }

    static findMessage(cod: string): message {
        const msg = this.getMessages().find( msg => msg.cod === cod) 

        if(!msg) throw {cod: 'ERR005', msg: 'Erro ao encontrar a mensagem!'}

        return msg
    }

    static sendMessageService(msg: message, params: any): responseService {
        return {
            message: msg.message,
            statusCode: msg.statusCode,
            params
        }
            
    }
}