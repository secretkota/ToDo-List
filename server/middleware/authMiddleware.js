import jwt from 'jsonwebtoken'

export function auth(request, reply, done) {
    const authHeader = request.headers['authorization']
    if (!authHeader) return reply.code(401).send({ error: 'No token provided' })
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KET, (err, user) => {
        if (err) return reply.code(403).send({ error: 'Invalid token' })
        request.user = user
        done()
    })
}