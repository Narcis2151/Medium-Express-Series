# Project Initialization and Dependencies

## Initialize the project and typescript

```bash
yarn init -y
yarn add typescript -D
npx tsc --init
```

## Install the dependencies

```bash
yarn add express zod config cors express prisma bcrypt jsonwebtoken dotenv dayjs pino passport passport-google-oauth20 swagger-jsdoc swagger-ui-express
```

```bash
yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/pino ts-node-dev typescript jest supertest ts-jest @types/supertest @types/jest @types/swagger-jsdoc @types/swagger-ui-express @types/passport @types/passport-google-oauth20 -D
```

## Initialize Prisma

```bash
npx prisma init
```

## Add the following scripts to the package.json

```
"scripts": {
    "build": "tsc",
    "start": "node build/app.js",
    "dev": "tsnd --respawn --transpile-only src/app.ts"
}
```