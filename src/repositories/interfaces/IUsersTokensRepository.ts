export type ICreateUserTokensDTO = {
    user_id: number;
    refresh_token: string;
    expires_date: Date;
  
}

export type UsersTokens = {
  id_user_token: number
  id_user: number
  refresh_token: string
  expires_date: Date 
}

export interface IUsersTokensRepository {
    create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens>;
    findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersTokens>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(token: string):Promise<UsersTokens>;
  }