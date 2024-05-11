import {sendNotification} from '../services/sendNotification.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import PayloadValidationServices from "../services/validationservices.js"
import { notificationSchema } from "../utils/payloadSchema.js"

const sendingNotification = asyncHandler(async (req,res)=>{
    const {title, body, token} = req.body;
    const validatePayload =PayloadValidationServices.validateData(notificationSchema, {
        title: title,
        body: body,
        token: token
    });

    if (!validatePayload.isValid) {
        return res
        .status(400)
        .json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }
    await sendNotification(title, body, token);
    return res
   .status(200)
   .json({
        success: true,
        message: "Notification sent successfully"
    })
})


export {
    sendingNotification
}