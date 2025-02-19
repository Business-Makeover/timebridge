import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const Appointment = Type.Object({
  id: Type.String(),
  clientId: Type.String(),
  date: Type.String(),
  time: Type.String(),
  duration: Type.Number(),
  status: Type.String(),
  notes: Type.Optional(Type.String()),
});

export async function appointmentsRoutes(fastify: FastifyInstance) {
  // Get all appointments
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Appointment),
      },
    },
    handler: async (request, reply) => {
      return reply.send([]);
    },
  });

  // Create appointment
  fastify.post('/', {
    schema: {
      body: Type.Omit(Appointment, ['id']),
      response: {
        201: Appointment,
      },
    },
    handler: async (request, reply) => {
      return reply.code(201).send({});
    },
  });

  // Get appointment by ID
  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: Appointment,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Update appointment
  fastify.put('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      body: Type.Omit(Appointment, ['id']),
      response: {
        200: Appointment,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });

  // Delete appointment
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