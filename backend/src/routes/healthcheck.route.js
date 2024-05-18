import { Router } from "express";
import {
  healthCheckService,
  authHealthCheckServices,
  paymentHealthCheckServices,
  notificationHealthCheckServices,
} from "../controllers/healthcheck.controller.js";

const router = Router();

router.get("/", healthCheckService);
router.get("/auth", authHealthCheckServices);
router.get("/payment", paymentHealthCheckServices);
router.get("/notification", notificationHealthCheckServices);

export default router;
