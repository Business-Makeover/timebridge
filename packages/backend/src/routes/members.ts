import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const Member = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  role: Type.String(),
  specialties: Type.Array(Type.String()),
  bio: Type.Optional(Type.String()),
  imageUrl: Type.Optional(Type.String()),
  isActive: Type.Boolean(),
});

export async function membersRoutes(fastify: FastifyInstance) {
  // Get all members
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Member),
      },
    },
    handler: async (request, reply) => {
      return reply.send([]);
    },
  });

  // Create member
  fastify.post('/', {
    schema: {
      body: Type.Omit(Member, ['id']),
      response: {
        201: Member,
      },
    },
    handler: async (request, reply) => {
      return reply.code(201).send({});
    },
  });

  // Get member by ID
  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: Member,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Update member
  fastify.put('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Omit(Member, ['id']),
      response: {
        200: Member,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Delete member
  fastify.delete('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        204: Type.Null(),
      },
    },
    handler: async (request, reply) => {
      return reply.code(204).send();
    },
  });
}