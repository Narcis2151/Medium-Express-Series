import { Router } from "express";

import { register, login } from "./authentication.controller";
import { registerSchema, loginSchema } from "./authentication.schemas";
import { validate } from "../../middleware/validate";

const router = Router();

/**
 * @swagger
 * /authentication/register:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content: 
 *          application/json:
 *           schema:
 *            type: object
 *           properties:
 *           message:
 *           type: string
 *          example: User successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /authentication/login:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Bad request
 */
router.post("/login", validate(loginSchema), login);

export default router;
