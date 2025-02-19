import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const Client = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  phone: Type.String(),
  address: Type.Optional(Type.String()),
});

export async function clientsRoutes(fastify: FastifyInstance) {
  // Get all clients
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Client),
      },
    },
    handler: async (request, reply) => {
      return reply.send([]);
    },
  });

  // Create client
  fastify.post('/', {
    schema: {
      body: Type.Omit(Client, ['id']),
      response: {
        201: Client,
      },
    },
    handler: async (request, reply) => {
      return reply.code(201).send({});
    },
  });

  // Get client by ID
  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: Client,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Update client
  fastify.put('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Omit(Client, ['id']),
      response: {
        200: Client,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Delete client
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