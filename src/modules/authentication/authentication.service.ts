import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import {LoginInput, RegisterInput} from "./authentication.schemas";

const prisma = new PrismaClient();

export async function registerUser(registerInput: RegisterInput) {
  const hashedPassword = await bcrypt.hash(registerInput.password, 10);
  const user = await prisma.user.create({
    data: {
      email: registerInput.email,
      username: registerInput.username,
      password: hashedPassword,
    },
  });
  return generateToken(user.id);
};

export async function loginUser(loginInput: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {email: loginInput.email},
  });
  if (!user || !await bcrypt.compare(loginInput.password, user.password)) {
    throw new Error('Invalid credentials');
  }
  return generateToken(user.id);
};

function generateToken(userId: number) {
  return jwt.sign({id: userId}, 'your-secret-key', {expiresIn: '24h'});
};