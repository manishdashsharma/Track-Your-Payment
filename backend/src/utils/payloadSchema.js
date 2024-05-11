import { z } from "zod"

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

export {
    signupSchema,
    loginSchema,
    notificationSchema
}