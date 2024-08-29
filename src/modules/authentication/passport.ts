import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/authentication/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0].value!,
              username: profile.displayName,
              googleId: profile.id,
            },
          });
        }

        const token = jwt.sign({ id: user.id }, "your-secret-key", {
          expiresIn: "24h",
        });
        return done(null, { user, token });
      } catch (error) {
        done(error);
      }
    },
  ),
);
