import * as User from "../controller/userController.js"


async function userRoutes(fastify, options) {
    fastify.post('/register', User.register)
    fastify.post('/login', User.login)
}


export default userRoutes