import fastify from "fastify"
import cors from "@fastify/cors"
import 'dotenv/config'
import userRoutes from "./routes/userRoute.js"

const app = fastify({
    logger: true
})

app.register(cors, {
    origin: '*',
    credentials: true
})

app.register(userRoutes, { prefix: '/user'})




app.listen({ port: 4000 });
console.log('Fastify API running on http://localhost:4000');