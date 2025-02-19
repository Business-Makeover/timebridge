import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const Availability = Type.Object({
  id: Type.String(),
  date: Type.String(),
  startTime: Type.String(),
  endTime: Type.String(),
  isAvailable: Type.Boolean(),
});

export async function availabilityRoutes(fastify: FastifyInstance) {
  // Get all available slots
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Availability),
      },
    },
    handler: async (request, reply) => {
      return reply.send([]);
    },
  });

  // Set available slots
  fastify.post('/', {
    schema: {
      body: Type.Omit(Availability, ['id']),
      response: {
        201: Availability,
      },
    },
    handler: async (request, reply) => {
      return reply.code(201).send({});
    },
  });

  // Update availability
  fastify.put('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Omit(Availability, ['id']),
      response: {
        200: Availability,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Delete availability slot
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