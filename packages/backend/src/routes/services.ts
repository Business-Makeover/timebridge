import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const Service = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  duration: Type.Number(),
  price: Type.Number(),
  isActive: Type.Boolean(),
  category: Type.Optional(Type.String()),
});

export async function servicesRoutes(fastify: FastifyInstance) {
  // Get all services
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Service),
      },
    },
    handler: async (request, reply) => {
      return reply.send([]);
    },
  });

  // Create service
  fastify.post('/', {
    schema: {
      body: Type.Omit(Service, ['id']),
      response: {
        201: Service,
      },
    },
    handler: async (request, reply) => {
      return reply.code(201).send({});
    },
  });

  // Get service by ID
  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: Service,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Update service
  fastify.put('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Omit(Service, ['id']),
      response: {
        200: Service,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Delete service
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