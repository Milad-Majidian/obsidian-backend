import { Router } from "express";
import { register, login, refresh } from "@/modules/website/controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh",refresh)

export default authRoutes;