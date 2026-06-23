/**
 * Node modules
 */
import swaggerJSDoc from 'swagger-jsdoc';

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API documentation for Blog API',
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['admin', 'user'] },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            socialLinks: {
              type: 'object',
              properties: {
                website: { type: 'string' },
                facebook: { type: 'string' },
                instagram: { type: 'string' },
                linkedIn: { type: 'string' },
                x: { type: 'string' },
                youtube: { type: 'string' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' },
          },
          required: ['email', 'password'],
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/User' },
            accessToken: { type: 'string' },
          },
        },
        RefreshResponse: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserInput' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthResponse' },
                },
              },
            },
            '403': { description: 'Forbidden' },
            '500': { description: 'Server error' },
          },
        },
      },
      '/auth/login': {
        post: {
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Logged in',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AuthResponse' },
                },
              },
            },
            '404': { description: 'Not found' },
            '500': { description: 'Server error' },
          },
        },
      },
      '/auth/refresh-token': {
        post: {
          summary: 'Refresh access token using refresh token cookie',
          responses: {
            '200': {
              description: 'Token refreshed',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/RefreshResponse' },
                },
              },
            },
            '401': { description: 'Unauthorized' },
            '500': { description: 'Server error' },
          },
        },
      },
      '/auth/logout': {
        post: {
          summary: 'Logout user (requires authentication)',
          security: [{ bearerAuth: [] }],
          responses: {
            '204': { description: 'No content' },
            '401': { description: 'Unauthorized' },
            '500': { description: 'Server error' },
          },
        },
      },
      '/users/current': {
        get: {
          summary: 'Get current user',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { user: { $ref: '#/components/schemas/User' } },
                  },
                },
              },
            },
            '401': { description: 'Unauthorized' },
          },
        },
        put: {
          summary: 'Update current user',
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: { 'application/json': { schema: { type: 'object' } } },
          },
          responses: {
            '200': {
              description: 'Updated',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: { user: { $ref: '#/components/schemas/User' } },
                  },
                },
              },
            },
            '401': { description: 'Unauthorized' },
          },
        },
        delete: {
          summary: 'Delete current user',
          security: [{ bearerAuth: [] }],
          responses: {
            '204': { description: 'Deleted' },
            '401': { description: 'Unauthorized' },
          },
        },
      },
      '/users': {
        get: {
          summary: 'Get all users (admin only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer' } },
            { name: 'offset', in: 'query', schema: { type: 'integer' } },
          ],
          responses: {
            '200': {
              description: 'OK',
              content: { 'application/json': { schema: { type: 'object' } } },
            },
            '401': { description: 'Unauthorized' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options as any);

export default swaggerSpec;
