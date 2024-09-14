import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the Medium-like platform",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    security: {
      bearerAuth: [],
    },
    schemas: {
      Article: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: "1",
          },
          title: {
            type: "string",
            example: "Article Title",
          },
          content: {
            type: "string",
            example: "Article Content",
          },
          createdAt: {
            type: "string",
            example: "2024-09-20T10:00:00.000Z",
          },
          authorId: {
            type: "integer",
            example: "1",
          },
        },
      },
      CreateArticle: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: {
            type: "string",
            example: "Article Title",
          },
          content: {
            type: "string",
            example: "Article Content",
          },
        },
      },
      UpdateArticle: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: {
            type: "string",
            example: "New title",
          },
          content: {
            type: "string",
            example: "New content",
          },
        },
      },
      RegisterUser: {
        type: "object",
        required: ["email", "username", "password"],
        properties: {
          email: {
            type: "string",
            example: "test@mail.com",
          },
          username: {
            type: "string",
            example: "testuser",
          },
          password: {
            type: "string",
            example: "testpassword",
          },
        },
      },
      LoginUser: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            example: "admin@example.com",
          },
          password: {
            type: "string",
            example: "adminpassword",
          },
        },
      },
      UpdateRoleRequest: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: ["APPROVED", "REJECTED"],
            example: "APPROVED",
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.routes.ts"], // Path to the API docs (for swagger-jsdoc to parse)
};

const swaggerSpec = swaggerJSDoc(options);

// Function to setup swagger docs in Express
export const setupSwaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger docs available at http://localhost:3000/api-docs`);
};
