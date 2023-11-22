import express from "express";
const router = express.Router();
import { signup, signin, googleAuth } from "../controllers/Auth.js";

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(googleAuth);

export default router;
