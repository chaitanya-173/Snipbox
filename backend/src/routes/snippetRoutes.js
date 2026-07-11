import { Router } from "express";
import {
  getSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from "../controllers/snippetController.js";
import { snippetBodyValidator, idParamValidator } from "../validators/snippetValidators.js";
import { validate } from "../middleware/validate.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getSnippets);
router.get("/:id", idParamValidator, validate, getSnippet);
router.post("/", snippetBodyValidator, validate, createSnippet);
router.put("/:id", idParamValidator, snippetBodyValidator, validate, updateSnippet);
router.delete("/:id", idParamValidator, validate, deleteSnippet);

export default router;