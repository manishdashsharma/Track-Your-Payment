import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    referanceId: {
        type: String,
        required: [true, "Referance id is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
    }
},{timestamps:true});