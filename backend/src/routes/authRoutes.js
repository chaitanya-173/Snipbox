import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidators.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", requireAuth, me);

export default router;