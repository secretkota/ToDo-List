import type { FastifyInstance } from "fastify"
import * as User from "../controller/userController.ts"


async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', User.register)
    fastify.post('/login', User.login)
}


export default userRoutes