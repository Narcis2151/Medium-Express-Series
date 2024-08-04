# Project Initialization and Dependencies

## Initialize the project and typescript

```bash
yarn init -y
yarn add typescript -D
npx tsc --init
```

## Install the dependencies

```bash
yarn add express zod config cors express prisma bcrypt jsonwebtoken dotenv dayjs pino

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/pino ts-node-dev typescript -D
```

## Initialize Prisma

```bash
npx prisma init
```

## Add the following scripts to the package.json

```
"scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "tsnd --respawn --transpile-only src/app.ts"
}
```