import express from "express";
const router = express.Router();
import { signup } from "../controllers/Auth.js";

router.route("/signup").post(signup);

export default router;
