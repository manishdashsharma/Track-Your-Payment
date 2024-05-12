import { Router } from "express";
import healtcheckRoutes from './healthcheck.route.js'
import authRoutes from './auth.route.js'
// import notiRoutes from './notification.route.js'
import paymentRoutes from './payment.route.js'

 
const router = Router()


router.use("/healtcheckup", healtcheckRoutes)
router.use("/auth", authRoutes)
// router.use("/send-notification", notiRoutes)
router.use("/payment", paymentRoutes)

export default router