import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import jwt from 'jsonwebtoken'
import type { TUser } from '../types/user.types.ts';

declare module 'fastify' {
  interface FastifyRequest {
    user?: TUser;
  }
}

export function auth(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const authHeader = request.headers['authorization']
    if (!authHeader) return reply.code(401).send({ error: 'No token provided' })
    const token = authHeader.split(' ')[1] as string
    const SECRET_KEY = process.env['SECRET_KEY'] as string
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return reply.code(403).send({ error: 'Invalid token' });

        if (!decoded || typeof decoded === 'string') {
            return reply.code(403).send({ error: 'Invalid token payload' });
        }

        request.user = decoded as TUser;
        return done();
    });
}