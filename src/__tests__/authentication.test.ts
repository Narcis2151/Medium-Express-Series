import request from "supertest";
import createServer from "../server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = createServer();

const mockUser = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  password: "testpassword",
};

describe("authentication", () => {
  describe("register user endpoint", () => {
    describe("given the right credentials are provided", () => {
      it("should return a JWT", async () => {
        //@ts-ignore
        prisma.user.create.mockResolvedValue(mockUser);

        const response = await request(app)
          .post("/authentication/register")
          .send({
            username: "testuser",
            email: "test@example.com",
            password: "testpassword",
          });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });

    describe("given the right credentials are not provided", () => {
      it("should return a 400 and an error", async () => {
        //@ts-ignore
        prisma.user.create.mockResolvedValue(mockUser);

        const response = await request(app)
          .post("/authentication/register")
          .send({
            email: "test@example.com",
            password: "testpassword",
          });
        expect(response.status).toBe(400);
        expect(response.error).toBeDefined();
      });
    });
  });

  describe("login user endpoint", () => {
    describe("given the credentials are valid", () => {
      it("should login an existing user", async () => {
        //@ts-ignore
        prisma.user.findUnique.mockResolvedValue(mockUser);

        const response = await request(app).post("/authentication/login").send({
          email: "test@example.com",
          password: "testpassword",
        });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });

    describe("given the credentials are not valid", () => {
      it("should return a 400 and an error", async () => {
        //@ts-ignore
        prisma.user.findUnique.mockResolvedValue(mockUser);

        const response = await request(app).post("/authentication/login").send({
          email: "test@example.com",
          password: "anotherpassword",
        });

        expect(response.status).toBe(400);
        expect(response.error).toBeDefined();
      });
    });
  });
});
