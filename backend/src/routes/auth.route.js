import { Router } from "express";
import { signUp ,getProfile, login, logout, refreshAccessToken, changeCurrentPassword } from "../controllers/auth.controller.js";
import {  isLoggedIn } from "../middlewares/auth.middleware.js";


const router = Router()

router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", isLoggedIn ,logout)
router.get("/profile", isLoggedIn, getProfile)
router.post("/refresh-token",refreshAccessToken)
router.post("/change-password",isLoggedIn,changeCurrentPassword)

export default router;