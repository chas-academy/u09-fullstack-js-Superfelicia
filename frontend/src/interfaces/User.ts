export interface User {
    _id: string
    name: string
    email: string
    roles: string[]
    [key: string]: any
}