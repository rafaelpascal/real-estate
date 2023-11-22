import express from "express";
const router = express.Router();
import { createUser } from "../controllers/User.js";

router.route("/").get(createUser);

export default router;
