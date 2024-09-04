import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const writer1 = await prisma.user.upsert({
    where: { email: "writer1@example.com" },
    update: {},
    create: {
      email: "writer1@example.com",
      username: "writer1",
      password: await bcrypt.hash("writer1password", 10),
      role: "WRITER",
    },
  });

  const writer2 = await prisma.user.upsert({
    where: { email: "writer2@example.com" },
    update: {},
    create: {
      email: "writer2@example.com",
      username: "writer2",
      password: await bcrypt.hash("writer2password", 10),
      role: "WRITER",
    },
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Article 1 by Writer 1",
        content: "This is the content of Article 1 by Writer 1",
        authorId: writer1.id,
      },
      {
        title: "Article 2 by Writer 1",
        content: "This is the content of Article 2 by Writer 1",
        authorId: writer1.id,
      },
    ],
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Article 1 by Writer 2",
        content: "This is the content of Article 1 by Writer 2",
        authorId: writer2.id,
      },
      {
        title: "Article 2 by Writer 2",
        content: "This is the content of Article 2 by Writer 2",
        authorId: writer2.id,
      },
    ],
  });

  console.log("Users and articles seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
