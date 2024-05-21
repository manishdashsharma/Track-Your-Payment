import mongoose from "mongoose";
import { paymentStatus, paymentType,paymentMethod, currency } from "../utils/helper.js";

const paymentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    description:{
        type: String
    },
    dueDate:{
        type: Date,
        required: [true, "Due date is required"]
    },
    amount:{
        type: Number,
        required: [true, "Amount is required"]
    },
    paidDate:{
        type: Date
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    paymentType:{
        type: String,
        enum: Object.values(paymentType),
        default: paymentType.MONTHLY
    },
    paymentStatus:{
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.UNPAID
    },
    reminder: {
        type: Boolean,
        default: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    paymentMethod:{
        type: String,
        enum: Object.values(paymentMethod),
        default: paymentMethod.CREDIT_CARD
    },
    linkToPay: {
        type: String,
        default: ""
    },
    currency: {
        type: String,
        enum: Object.values(currency),
        default: currency.INR
    },
    numberOftimesPaid: {
        type: Number,
        default: 0
    },
    lastPyamentOn: {
        type: Date
    }
},{timeseries:true});


export default mongoose.model("Payment",paymentSchema)