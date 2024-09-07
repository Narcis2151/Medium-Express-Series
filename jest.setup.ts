import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

jest.mock("@prisma/client", () => {
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    article: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    userFollower: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

// Mock the Google OAuth strategy to avoid requiring client ID and secret during testing
jest.mock("passport-google-oauth20", () => {
  return {
    Strategy: jest.fn((options, verify) => {
      return {
        name: "google",
        authenticate: jest.fn(),
      };
    }),
  };
});

jest.mock("./src/middleware/authenticate", () => {
  return {
    authenticate: jest.fn((req: Request, res: Response, next: NextFunction) => {
      // Mock user data in the response locals
      res.locals.user = 1; // Mock a user ID to simulate an authenticated user
      return next();
    }),
  };
});

jest.mock("./src/middleware/authorize", () => {
  return {
    authorize: jest.fn((roles: string[]) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        return next();
      };
    }),
  };
});

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedpassword"),
  compare: jest
    .fn()
    .mockImplementation((password1, password2) => password1 === password2),
}));
