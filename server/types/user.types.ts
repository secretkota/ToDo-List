export type TUser = {
    id: string,
    username: string,
    password: string,
    role?: string
}

export interface IloginBody {
    username: string,
    password: string
}