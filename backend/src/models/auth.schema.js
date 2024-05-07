import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true,
        required: [true, "Name is required"],
        maxlength: [50, "Name must be less than 50 chars"]
    },
    name: {
        type: String,
        required: [true, "Username is required"],
        maxlength: [50, "Userame must be less than 50 chars"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 chars"],
        select: false
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a valid phone number"],
        validate: {
            validator: function(value) {
                return /^\d{10}$/.test(value);
            },
            message: "Please enter a valid phone number"
        }
    },
    refreshToken: {
        type: String
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date
}, { timestamps: true });


userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods = {
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    },
    getJWTtoken: function(){
        return JWT.sign({_id: this._id, role: this.role}, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY
        })
    },
    
    generateForgotPasswordToken: function (){
        const forgotToken = crypto.randomBytes(20).toString("hex")

        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

        return forgotToken
    },

    generateAccessToken : function(){
        return JWT.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                name: this.name
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    generateRefeshToken : function(){
        return JWT.sign(
            {
                _id: this._id,
            },
            config.REFRESH_TOKEN_SECRET,
            {
                expiresIn: config.REFRESH_TOKEN_EXPIRY
            }
        )
    }
}


export default mongoose.model("User", userSchema)