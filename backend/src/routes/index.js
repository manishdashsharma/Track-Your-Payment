import { Router } from "express";
import healtcheckRoutes from './healthcheck.route.js'
import authRoutes from './auth.route.js'

 
const router = Router()


router.use("/healtcheckup", healtcheckRoutes)
router.use("/auth", authRoutes)

export default router