import User from '../models/auth.schema.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import config from './../config/index.js';
import JWT from "jsonwebtoken";
import PayloadValidationServices from "../services/validationservices.js";
import { signupSchema, loginSchema } from "../utils/payloadSchema.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefeshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating refresh and access tokens");
    }
};

const signUp = asyncHandler(async (req, res) => {
    const { name, username, email, password, phoneNumber } = req.body;

    const validatePayload = PayloadValidationServices.validateData(signupSchema, {
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        username: username
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        return res.status(302).json({
            success: false,
            message: "User already exists"
        });
    }

    const user = await User.create({
        name,
        username: username.toLowerCase(),
        email,
        password,
        phoneNumber
    });

    if (!user) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

    const newUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        response: newUser
    });
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const validatePayload = PayloadValidationServices.validateData(loginSchema, {
        password: password,
        username: username
    });

    if (!validatePayload.isValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid payload",
            errors: validatePayload.errors
        });
    }

    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            refreshToken
        });
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            refreshToken: undefined
        },
        {
            new: true,
            runValidators: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            success: true,
            message: "User logged out successfully"
        });
});

const getProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(200).json({
        success: true,
        message: "Current logged in user details",
        response: user
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized request"
        });
    }

    try {
        const decodedToken = JWT.verify(
            incomingRefreshToken,
            config.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user || incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        return res.status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({
                success: true,
                message: "Access token has been refreshed successfully",
                accessToken,
                refreshToken
            });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid refresh token"
        });
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id).select('+password');

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Old password is incorrect"
        });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});

export {
    signUp,
    login,
    logout,
    getProfile,
    refreshAccessToken,
    changeCurrentPassword
};
