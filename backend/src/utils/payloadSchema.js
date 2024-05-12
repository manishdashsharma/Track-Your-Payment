import { z } from "zod"
import { paymentType, paymentMethod, currency, paymentStatus } from "./helper.js"

const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phoneNumber: z.string(),
    username: z.string()
});

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});

const notificationSchema = z.object({
    title: z.string(),
    body: z.string(),
    token: z.string()
})

const paymentListSchema = z.object({
   title: z.string(),
   description: z.string(),
   dueDate: z.string().date(),
   amount: z.number(),
   userId: z.string(),
   paymentType: z.nativeEnum(paymentType).optional(),
   linkToPay: z.string().optional(),
   reminder: z.boolean().optional(),
   paymentMethod: z.nativeEnum(paymentMethod).optional(),
   currency: z.nativeEnum(currency).optional()
});

const updatePaymentListSchema = z.object({
    paymentId: z.string(), 
    updateField: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        dueDate: z.string().date().optional(),
        amount: z.number().optional(),
        paymentType: z.nativeEnum(paymentType).optional(),
        linkToPay: z.string().optional(),
        reminder: z.boolean().optional(),
        paymentMethod: z.nativeEnum(paymentMethod).optional(),
        currency: z.nativeEnum(currency).optional()
    })
})

const updatePaymentStatusSchema = z.object({
    paymentId: z.string(),
    paymentStatus: z.nativeEnum(paymentStatus),
    paidDate: z.string().date().optional()
})

export {
    signupSchema,
    loginSchema,
    notificationSchema,
    paymentListSchema,
    updatePaymentListSchema,
    updatePaymentStatusSchema
}