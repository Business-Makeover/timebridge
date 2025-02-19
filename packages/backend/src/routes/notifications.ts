import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

const Notification = Type.Object({
  id: Type.String(),
  type: Type.Union([
    Type.Literal('email'),
    Type.Literal('sms'),
    Type.Literal('whatsapp'),
  ]),
  recipient: Type.String(),
  message: Type.String(),
  status: Type.Union([
    Type.Literal('pending'),
    Type.Literal('sent'),
    Type.Literal('failed'),
  ]),
});

export async function notificationsRoutes(fastify: FastifyInstance) {
  // Send notification
  fastify.post('/send', {
    schema: {
      body: Type.Omit(Notification, ['id', 'status']),
      response: {
        201: Notification,
      },
    },
    handler: async (request, reply) => {
      return reply.code(201).send({});
    },
  });

  // Get notification details
  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: Notification,
      },
    },
    handler: async (request, reply) => {
      return reply.send({});
    },
  });
}