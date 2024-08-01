yarn init

yarn add express zod config cors express prisma bcrypt jsonwebtoken

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/bcrypt @types/jsonwebtoken ts-node-dev typescript -D

npx prisma init

"scripts": {
    "dev": "tsnd --respawn --transpile-only src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js"
}