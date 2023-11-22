import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/Auth.js";

router.route("/signup").post(signup);
router.route("/signin").post(signin);

export default router;
