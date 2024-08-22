import { Router } from "express";
import { register, login } from "./authentication.controller";
import { validate } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./authentication.schemas";

const router = Router();

router.post("/register", validate(loginSchema), register);
router.post("/login", validate(registerSchema), login);

export default router;
