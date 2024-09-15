import { Router } from "express";

import {
  requestWriterRole,
  viewRoleRequests,
  updateRoleRequest,
} from "./authorization.controller";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";
import { updateRoleRequestSchema } from "./authorization.schemas";

const router = Router();

/**
 * @swagger
 * /authorization/request-writer:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Request writer role
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Request for writer role submitted"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 */
router.post("/request-writer", [authenticate], requestWriterRole);

/**
 * @swagger
 * /authorization/role-requests:
 *   get:
 *     tags:
 *       - Authorization
 *     summary: View role requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of role requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleRequest'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden (Requires ADMIN role)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 */
router.get(
  "/role-requests",
  [authenticate, authorize(["ADMIN"])],
  viewRoleRequests
);

/**
 * @swagger
 * /authorization/role-requests/{id}:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Update role request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleRequest'
 *     responses:
 *       200:
 *         description: Role request accepted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Role request ACCEPTED"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Unauthorized'
 *       403:
 *         description: Forbidden (Requires ADMIN role)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forbidden'
 */
router.post(
  "/role-requests/:id",
  [authenticate, authorize(["ADMIN"]), validate(updateRoleRequestSchema)],
  updateRoleRequest
);

export default router;
