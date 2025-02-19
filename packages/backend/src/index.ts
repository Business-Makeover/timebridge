import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { appointmentsRoutes } from './routes/appointments';
import { clientsRoutes } from './routes/clients';
import { availabilityRoutes } from './routes/availability';
import { notificationsRoutes } from './routes/notifications';
import { authRoutes } from './routes/auth';
import { servicesRoutes } from './routes/services';
import { membersRoutes } from './routes/members';

const fastify = Fastify({
  logger: true,
});

// Register plugins
fastify.register(cors, {
  origin: true,
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key',
});

// Add authentication decorator
fastify.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register Swagger
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'API documentation for the appointment scheduling system',
      version: '1.0.0',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
});

fastify.register(swaggerUi, {
  routePrefix: '/documentation',
});

// Register routes
fastify.register(appointmentsRoutes, { prefix: '/api/appointments' });
fastify.register(clientsRoutes, { prefix: '/api/clients' });
fastify.register(availabilityRoutes, { prefix: '/api/availability' });
fastify.register(notificationsRoutes, { prefix: '/api/notifications' });
fastify.register(authRoutes, { prefix: '/api/auth' });
fastify.register(servicesRoutes, { prefix: '/api/services' });
fastify.register(membersRoutes, { prefix: '/api/members' });

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();