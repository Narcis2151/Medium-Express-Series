import { Router } from "express";

import { register, login } from "./authentication.controller";
import { registerSchema, loginSchema } from "./authentication.schemas";
import { validate } from "../../middleware/validate";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
