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
 *      - Authorization
 *     summary: Request writer role
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request sent
 */
router.post("/request-writer", [authenticate], requestWriterRole);

/**
 * @swagger
 * /authorization/role-requests:
 *   get:
 *     tags:
 *      - Authorization
 *     summary: View role requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of role requests
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
 *      - Authorization
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
 *         description: Role request updated
 */
router.post(
  "/role-requests/:id",
  [authenticate, authorize(["ADMIN"]), validate(updateRoleRequestSchema)],
  updateRoleRequest
);

export default router;
