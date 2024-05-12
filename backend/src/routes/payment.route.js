import { Router } from "express";
import { addPaymentList, getPaymentList, removePaymentList, updatePaymentList, getPaymentListById, updatePaymentStatus } from "../controllers/payment.controller.js";
import {  isLoggedIn } from "../middlewares/auth.middleware.js";


const router = Router()

router.post("/",isLoggedIn, addPaymentList)
router.get("/",isLoggedIn, getPaymentList)
router.delete("/:id",isLoggedIn, removePaymentList)
router.put("/:id",isLoggedIn, updatePaymentList)
router.get("/:id",isLoggedIn, getPaymentListById)
router.put("/update-payment-status/:id",isLoggedIn, updatePaymentStatus)

export default router;