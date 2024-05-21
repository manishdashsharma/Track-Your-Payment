import Payment from '../models/payment.schema.js';
import User from '../models/auth.schema.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import PayloadValidationServices from "../services/validationservices.js";
import { paymentListSchema, updatePaymentListSchema, updatePaymentStatusSchema } from "../utils/payloadSchema.js";

const addPaymentList = asyncHandler(async (req, res) => {
    const { title, description, dueDate, amount, userId, paymentType, linkToPay, reminder, paymentMethod } = req.body;

    const validatePayload = PayloadValidationServices.validateData(paymentListSchema, {
        title, description, dueDate, amount, userId, paymentType, linkToPay, reminder, paymentMethod
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        }); 
    }

    let response;
    const checkUserPaymentStatus = await User.findOne({ _id: userId });
    const listOfPaymentsAdded = await Payment.find({ userId });

    if (checkUserPaymentStatus?.is_paid) {
        console.log("User has already paid, allowing to add more payments");
        response = await Payment.create({
            title, description, dueDate, amount, userId, paymentType, linkToPay, reminder, paymentMethod
        });
    } else if (listOfPaymentsAdded.length >= 5) {
        console.log("User cannot add more payments");
        return res.status(400).json({
            success: false,
            message: "You have already added 5 payment lists. You need to pay to add more payments."
        });
    } else {
        response = await Payment.create({
            title, description, dueDate, amount, userId, paymentType, linkToPay, reminder, paymentMethod
        });
    }

    if (!response) {
        console.log("Unable to add payment list");
        return res.status(400).json({
            success: false,
            message: "Unable to add payment list"
        });
    }

    console.log("Payment list added successfully");
    return res.status(201).json({
        success: true,
        message: "Payment list added successfully",
        response
    });
});

const getPaymentList = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const response = await Payment.find({ userId });

    if (!response) {
        return res.status(400).json({
            success: false,
            message: "Unable to fetch payment list"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Payment list fetched successfully",
        response
    });
})

const removePaymentList = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const paymentId = req.params.id;
    if(!paymentId || !userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload"
        });
    }
    const response = await Payment.findOneAndDelete({ _id: paymentId, userId });

    if (!response) {
        return res.status(400).json({
            success: false,
            message: "Unable to delete payment list"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Payment list deleted successfully",
        response
    });
})

const updatePaymentList = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const paymentId = req.params.id;
    const {updateField} = req.body;
 
    const validatePayload = PayloadValidationServices.validateData(updatePaymentListSchema, {
        updateField: updateField,
        paymentId: paymentId
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

    const response = await Payment.findOneAndUpdate({ _id: paymentId, userId }, updateField);


    if(!response) {
        return res.status(400).json({
            success: false,
            message: "Unable to update payment list"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Payment list data updated successfully",
    });

})

const getPaymentListById = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const paymentId = req.params.id;

    if(!paymentId ||!userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload"
        });
    }

    const response = await Payment.findOne({ _id: paymentId, userId });

    if(!response) {
        return res.status(400).json({
            success: false,
            message: "Unable to fetch payment list"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Payment list fetched successfully",
        response
    });
})

const updatePaymentStatus = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const paymentId = req.params.id;
    const { paymentStatus, paidDate } = req.body;

    const validatePayload = PayloadValidationServices.validateData(updatePaymentStatusSchema, {
        paymentId: paymentId,
        paymentStatus: paymentStatus,
        paidDate: paidDate
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

    const response = await Payment.findOne({ _id: paymentId, userId });

    if (!response) {
        return res.status(404).json({
            success: false,
            message: "No such payment list found"
        });
    }
    console.log("Pyament status from database",response.paymentStatus);
    console.log("Payment Status from frontend",paymentStatus);


    if (response.paymentStatus === "PAID") {
        return res.status(400).json({
            success: false,
            message: "You have already paid. You cannot change payment status"
        });
    }
    
    if (paymentStatus === "PAID" || paymentStatus === "PROCESSING") {
        response.paymentStatus = paymentStatus;
        response.paidDate = paidDate || new Date();
        response.is_paid = paymentStatus === "PAID";
        response.reminder = paymentStatus === "PAID" ? false : true;
        response.numberOftimesPaid = paymentStatus === "PAID"? response.numberOftimesPaid + 1 : response.numberOftimesPaid;
        response.lastPyamentOnPaymentDate = paymentStatus === "PAID"? paidDate : ""

        if (paymentStatus !== "PROCESSING") {
            const { paymentType, dueDate } = response;

            let newDueDate;
            switch (paymentType) {
                case "DAILY":
                    newDueDate = new Date(dueDate);
                    newDueDate.setDate(newDueDate.getDate() + 1);
                    break;
                case "WEEKLY":
                    newDueDate = new Date(dueDate);
                    newDueDate.setDate(newDueDate.getDate() + 7);
                    break;
                case "MONTHLY":
                    newDueDate = new Date(dueDate);
                    newDueDate.setDate(newDueDate.getDate() + 30);
                    break;
                case "YEARLY":
                    newDueDate = new Date(dueDate);
                    newDueDate.setDate(newDueDate.getDate() + 365);
                    break;
                case "ONCE":
                    break;
                default:
                    return res.status(400).json({
                        success: false,
                        message: "Unknown payment type"
                    });
            }

            if (newDueDate) {
                response.dueDate = newDueDate;
            }
        }

        await response.save();
    }

    if (paymentStatus === "FAILED") {
        response.paymentStatus = paymentStatus;
        await response.save();
    }

    return res.status(200).json({
        success: true,
        message: "Payment status updated successfully",
        response
    });
});




export { 
    addPaymentList, 
    getPaymentList, 
    removePaymentList,
    updatePaymentList,
    getPaymentListById,
    updatePaymentStatus
};
