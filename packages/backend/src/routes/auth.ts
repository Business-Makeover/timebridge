import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import bcrypt from 'bcryptjs';

const User = Type.Object({
  id: Type.String(),
  email: Type.String(),
  password: Type.String(),
  name: Type.String(),
});

const LoginResponse = Type.Object({
  token: Type.String(),
  user: Type.Omit(User, ['password']),
});

export async function authRoutes(fastify: FastifyInstance) {
  // Register
  fastify.post('/register', {
    schema: {
      body: Type.Omit(User, ['id']),
      response: {
        201: Type.Omit(User, ['password']),
      },
    },
    handler: async (request, reply) => {
      const { password, ...userData } = request.body as any;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // TODO: Save user to database
      const user = {
        id: 'temp-id',
        ...userData,
      };

      return reply.code(201).send(user);
    },
  });

  // Login
  fastify.post('/login', {
    schema: {
      body: Type.Object({
        email: Type.String(),
        password: Type.String(),
      }),
      response: {
        200: LoginResponse,
      },
    },
    handler: async (request, reply) => {
      const { email, password } = request.body as any;
      
      // TODO: Get user from database and verify password
      const token = await reply.jwtSign({ 
        id: 'temp-id',
        email,
      });

      return reply.send({
        token,
        user: {
          id: 'temp-id',
          email,
          name: 'Test User',
        },
      });
    },
  });

  // Get profile
  fastify.get('/profile', {
    schema: {
      response: {
        200: Type.Omit(User, ['password']),
      },
    },
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const user = request.user;
      
      // TODO: Get user profile from database
      return reply.send({
        id: user.id,
        email: user.email,
        name: 'Test User',
      });
    },
  });
}