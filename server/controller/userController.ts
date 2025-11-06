import * as User from '../models/userModels.ts'
import bcrypt from 'bcrypt'
import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken'
import type { IloginBody, TUser } from '../types/user.types.ts';



export async function register(request: FastifyRequest<{ Body: IloginBody}>, reply: FastifyReply) {
  const { username, password } = request.body;

  if (!username.trim() || !password.trim()) {
    return reply.code(400).send({ error: 'Username and password are required' });
  }
  if (password.length < 8) {
    return reply.code(400).send({ error: 'Password must be at least 8 characters long' });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return reply.code(400).send({ error: 'Username can only contain letters, numbers, and underscores' });
  }
  if (username.length < 3 || username.length > 20) {
    return reply.code(400).send({ error: 'Username must be between 3 and 20 characters long' });
  }

  try {

    const existsUser = await User.getUserByUsername(username)

    if(existsUser) return reply.code(409).send({ error: 'User already exists' })

    const hashPassword = await bcrypt.hash(password, 10);
    await User.register(username, hashPassword);
    reply.code(201).send({ message: 'User was created'});
  } catch (error) {
    reply.code(500).send({ error: 'Internal server error' });
  }
}


export async function login(request: FastifyRequest<{ Body: IloginBody}>, reply: FastifyReply) {
    const { username, password } = request.body
    
    try {
        const user: TUser | null = await User.getUserByUsername(username)
        if (!user) return reply.code(400).send({ error: 'Invalid username or password' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) return reply.code(400).send({ error: 'Invalid username or password' })


        const SECRET_KEY = process.env['SECRET_KEY'] as string
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            }, 
            SECRET_KEY,
            {
                expiresIn: '1h'
            }
        )
        reply.send({ token })
    } catch (err) {
        reply.code(500).send({ error: 'Internal server error' })
    }
}