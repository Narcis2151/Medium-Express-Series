import request from "supertest";
import createServer from "../server";
import { PrismaClient } from "@prisma/client";
import { mock } from "node:test";

const prisma = new PrismaClient();
const app = createServer();

const mockArticle = {
  id: 1,
  title: "Test Article",
  content: "This is a test article",
  createdAt: new Date().toJSON(),
  authorId: 1,
};

describe("articles", () => {
  describe("get articles endpoint", () => {
    it("should return a list of articles", async () => {
      //@ts-ignore
      prisma.article.findMany.mockResolvedValue([mockArticle]);

      const response = await request(app).get("/articles");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockArticle]);
    });
  });

  describe("get single article endpoint", () => {
    it("should return a single article", async () => {
      //@ts-ignore
      prisma.article.findUnique.mockResolvedValue(mockArticle);

      const response = await request(app).get("/articles/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockArticle);
    });
  });

  describe("create article endpoint", () => {
    describe("given the user is not logged in", () => {
      it("should return a 401 status code and an error", async () => {
        const response = await request(app).post("/articles").send({
          title: "Test Article",
          content: "This is a test article",
        });
        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });
    });
    describe("given the user is logged in and is not a WRITER", () => {
      it("should return a 403 status code and an error", async () => {
        const response = await request(app)
          .post("/articles")
          .set("Authorization", "Bearer Token")
          .send({
            title: "Test Article",
            content: "This is a test article",
          });
        expect(response.status).toBe(403);
        expect(response.error).toBeDefined();
      });
    });
    describe("given the user is logged in and is a WRITER", () => {
      it("should return a 201 status code and the created article", async () => {
        //@ts-ignore
        prisma.article.create.mockResolvedValue(mockArticle);

        const response = await request(app)
          .post("/articles")
          .set("Authorization", "Bearer WRITER")
          .send({
            title: "Test Article",
            content: "This is a test article",
          });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockArticle);
      });
    });
  });

  describe("update article endpoint", () => {
    describe("given the user is not logged in", () => {
      it("should return a 401 status code and an error", async () => {
        const response = await request(app).put("/articles/1").send({
          title: "Test Article",
          content: "This is a test article",
        });
        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });
    });
    describe("given the user is logged in and is not a WRITER", () => {
      it("should return a 403 status code and an error", async () => {
        const response = await request(app)
          .put("/articles/1")
          .set("Authorization", "Bearer Token")
          .send({
            title: "Test Article",
            content: "This is a test article",
          });
        expect(response.status).toBe(403);
        expect(response.error).toBeDefined();
      });
    });

    describe("given the user is logged in and is a WRITER but did not provide the full body", () => {
      it("should return a 400 status code and an error", async () => {
        const response = await request(app)
          .put("/articles/1")
          .set("Authorization", "Bearer WRITER")
          .send({
            title: "Test Article",
          });
        expect(response.status).toBe(400);
        expect(response.error).toBeDefined();
      });
    });
    describe("given the user is logged in and is a WRITER but he's not the author of the article", () => {
      it("should return a 400 status code and an error", async () => {
        const response = await request(app)
          .put("/articles/1")
          .set("Authorization", "Bearer WRITER")
          .send({
            title: "Test Article",
            content: "This is a test article",
          });
        expect(response.status).toBe(400);
        expect(response.error).toBeDefined();
      });
    });

    describe("given the user is logged in and is a WRITER and is the author of the article and provided the full body", () => {
      it("should return a 200 status code and the created article", async () => {
        //@ts-ignore
        prisma.article.update.mockResolvedValue(mockArticle);

        const response = await request(app)
          .put("/articles/1")
          .set("Authorization", "Bearer WRITER")
          .send({
            title: "Test Article",
            content: "This is a test article",
          });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockArticle);
      });
    });
  });

  describe("delete article endpoint", () => {
    describe("given the user is not logged in", () => {
      it("should return a 401 status code and an error", async () => {
        const response = await request(app).delete("/articles/1");
        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
      });
    });
    describe("given the user is logged in and is not a WRITER", () => {
      it("should return a 403 status code and an error", async () => {
        const response = await request(app)
          .delete("/articles/1")
          .set("Authorization", "Bearer Token");
        expect(response.status).toBe(403);
        expect(response.error).toBeDefined();
      });
    });

    describe("given the user is logged in and is a WRITER but he's not the author of the article", () => {
      it("should return a 400 status code and an error", async () => {
        const response = await request(app)
          .delete("/articles/1")
          .set("Authorization", "Bearer WRITER");
        expect(response.status).toBe(400);
        expect(response.error).toBeDefined();
      });
    });

    describe("given the user is logged in and is a WRITER and is the author of the article", () => {
      it("should return a 204 status code", async () => {
        //@ts-ignore
        prisma.article.delete.mockResolvedValue(mockArticle);

        const response = await request(app)
          .delete("/articles/1")
          .set("Authorization", "Bearer WRITER");
        expect(response.status).toBe(204);
      });
    });
  });
});
